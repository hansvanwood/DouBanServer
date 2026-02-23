package com.example.movie.common.util;

import java.net.*;
import java.util.*;

/**
 * IPUtil - 跨平台本机 IP 地址工具类
 * 兼容 macOS / Windows / Linux，运行环境 Java 21+
 */
public class IPUtil {

    /**
     * 获取最优先的本机非回环 IPv4 地址。
     * 策略：优先返回能连通外网的出口 IP，其次按网卡优先级排序。
     *
     * @return IPv4 地址字符串，获取失败时返回 "127.0.0.1"
     */
    public static String getLocalIPv4() {
        // 策略1：通过 UDP "连接" 公网 DNS，获取系统选择的出口网卡 IP（不会真正发包）
        try (DatagramSocket socket = new DatagramSocket()) {
            socket.connect(InetAddress.getByName("8.8.8.8"), 53);
            String ip = socket.getLocalAddress().getHostAddress();
            if (isValidIPv4(ip)) {
                return ip;
            }
        } catch (Exception ignored) {
        }

        // 策略2：遍历所有网卡，按优先级选取
        try {
            List<InetAddress> candidates = new ArrayList<>();
            Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();
            for (NetworkInterface ni : Collections.list(interfaces)) {
                if (!ni.isUp() || ni.isLoopback() || ni.isVirtual()) continue;
                // 物理网卡或常见真实网卡优先（排除虚拟网桥/VPN 等）
                for (InetAddress addr : Collections.list(ni.getInetAddresses())) {
                    if (addr instanceof Inet4Address && !addr.isLoopbackAddress()) {
                        candidates.add(addr);
                    }
                }
            }

            return candidates.stream()
                    .sorted(Comparator.comparingInt(IPUtil::networkPriority))
                    .map(InetAddress::getHostAddress)
                    .filter(IPUtil::isValidIPv4)
                    .findFirst()
                    .orElse("127.0.0.1");

        } catch (Exception ignored) {
        }

        return "127.0.0.1";
    }

    /**
     * 获取最优先的本机非回环 IPv6 地址。
     *
     * @return IPv6 地址字符串（不含 Zone ID），获取失败时返回 "::1"
     */
    public static String getLocalIPv6() {
        try {
            List<InetAddress> candidates = new ArrayList<>();
            Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();
            for (NetworkInterface ni : Collections.list(interfaces)) {
                if (!ni.isUp() || ni.isLoopback() || ni.isVirtual()) continue;
                for (InetAddress addr : Collections.list(ni.getInetAddresses())) {
                    if (addr instanceof Inet6Address
                            && !addr.isLoopbackAddress()
                            && !addr.isLinkLocalAddress()) {
                        candidates.add(addr);
                    }
                }
            }
            return candidates.stream()
                    .map(a -> a.getHostAddress().split("%")[0]) // 去掉 Zone ID（如 %eth0）
                    .findFirst()
                    .orElse("::1");
        } catch (Exception ignored) {
        }
        return "::1";
    }

    /**
     * 获取所有本机非回环 IPv4 地址（多网卡场景）。
     */
    public static List<String> getAllLocalIPv4() {
        List<String> result = new ArrayList<>();
        try {
            Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();
            for (NetworkInterface ni : Collections.list(interfaces)) {
                if (!ni.isUp() || ni.isLoopback()) continue;
                for (InetAddress addr : Collections.list(ni.getInetAddresses())) {
                    if (addr instanceof Inet4Address && !addr.isLoopbackAddress()) {
                        String ip = addr.getHostAddress();
                        if (isValidIPv4(ip)) result.add(ip);
                    }
                }
            }
        } catch (Exception ignored) {
        }
        return result;
    }

    /**
     * 获取本机主机名。
     */
    public static String getHostName() {
        try {
            return InetAddress.getLocalHost().getHostName();
        } catch (UnknownHostException e) {
            return "unknown";
        }
    }

    /**
     * 打印所有网卡的详细信息（调试用）。
     */
    public static void printNetworkInterfaces() {
        try {
            Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();
            for (NetworkInterface ni : Collections.list(interfaces)) {
                System.out.printf("%-20s up=%-5b loopback=%-5b virtual=%-5b%n",
                        ni.getName(), ni.isUp(), ni.isLoopback(), ni.isVirtual());
                for (InetAddress addr : Collections.list(ni.getInetAddresses())) {
                    System.out.printf("    %s%n", addr.getHostAddress());
                }
            }
        } catch (SocketException e) {
            System.err.println("Failed to enumerate network interfaces: " + e.getMessage());
        }
    }

    // ------------------------------------------------------------------ //
    //  私有辅助方法
    // ------------------------------------------------------------------ //

    /**
     * 网卡优先级打分（分值越低越优先）：
     * 私有 192.168.x.x / 10.x.x.x / 172.16-31.x.x → 低分（优先）
     * 其他可路由地址 → 中分
     * 链路本地 169.254.x.x → 高分（最后选）
     */
    private static int networkPriority(InetAddress addr) {
        byte[] b = addr.getAddress();
        int first = b[0] & 0xFF;
        int second = b[1] & 0xFF;

        if (first == 192 && second == 168) return 0;
        if (first == 10) return 1;
        if (first == 172 && second >= 16 && second <= 31) return 2;
        if (first == 169 && second == 254) return 10; // APIPA，最低优先
        return 5;
    }

    private static boolean isValidIPv4(String ip) {
        if (ip == null || ip.isBlank()) return false;
        String[] parts = ip.split("\\.");
        if (parts.length != 4) return false;
        try {
            for (String part : parts) {
                int val = Integer.parseInt(part);
                if (val < 0 || val > 255) return false;
            }
            // 排除全零和回环
            return !ip.equals("0.0.0.0") && !ip.startsWith("127.");
        } catch (NumberFormatException e) {
            return false;
        }
    }
}