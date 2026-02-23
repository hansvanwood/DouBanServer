package com.example.movie.common.util;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("IPUtil工具类测试")
class IPUtilTest {

    @BeforeEach
    void setUp() {
        // 在每个测试方法运行前执行初始化操作（如果需要）
    }

    @Test
    @DisplayName("测试获取主要IPv4地址")
    void testGetLocalIPv4() {
        String ipv4 = IPUtil.getLocalIPv4();
        
        // 验证返回值不为null且不为空
        assertNotNull(ipv4, "IPv4地址不应为null");
        assertFalse(ipv4.isEmpty(), "IPv4地址不应为空");
        
        // 验证格式
        assertValidIPv4Format(ipv4);
        
        // 验证不是回环地址
        assertNotEquals("127.0.0.1", ipv4, "正常情况下不应返回回环地址");
        
        // 验证不是无效地址
        assertFalse(ipv4.equals("0.0.0.0"), "不应返回全零地址");
        assertFalse(ipv4.startsWith("127."), "不应返回127.x.x.x范围的地址");
    }

    @Test
    @DisplayName("测试获取主要IPv6地址")
    void testGetLocalIPv6() {
        String ipv6 = IPUtil.getLocalIPv6();
        
        // 验证返回值不为null且不为空
        assertNotNull(ipv6, "IPv6地址不应为null");
        assertFalse(ipv6.isEmpty(), "IPv6地址不应为空");
        
        // 验证不是默认回环地址（除非没有其他选择）
        // 注意：在某些环境下可能只能获取到::1
        if (!ipv6.equals("::1")) {
            // 验证不包含Zone ID
            assertFalse(ipv6.contains("%"), "IPv6地址不应包含Zone ID");
            // 验证不是回环地址
            assertNotEquals("::1", ipv6, "如果返回非默认值，不应是回环地址");
        }
    }

    @Test
    @DisplayName("测试获取所有IPv4地址")
    void testGetAllLocalIPv4() {
        List<String> ipv4List = IPUtil.getAllLocalIPv4();
        
        // 验证返回值不为null
        assertNotNull(ipv4List, "IPv4地址列表不应为null");
        
        // 验证列表中的每个IP地址格式正确
        for (String ip : ipv4List) {
            assertNotNull(ip, "列表中的IP地址不应为null");
            assertFalse(ip.isEmpty(), "列表中的IP地址不应为空");
            assertValidIPv4Format(ip);
            
            // 验证不是回环地址
            assertFalse(ip.startsWith("127."), "列表中不应包含回环地址");
            assertFalse(ip.equals("0.0.0.0"), "列表中不应包含全零地址");
        }
        
        // 验证列表中的元素都是唯一的
        assertEquals(ipv4List.size(), 
                    ipv4List.stream().distinct().count(), 
                    "列表中不应有重复的IP地址");
    }

    @Test
    @DisplayName("测试获取主机名")
    void testGetHostName() {
        String hostName = IPUtil.getHostName();
        
        // 验证返回值不为null且不为空
        assertNotNull(hostName, "主机名不应为null");
        assertFalse(hostName.isEmpty(), "主机名不应为空");
        
        // 验证不是默认值（除非真的获取失败）
        if (!hostName.equals("unknown")) {
            // 主机名应该不包含特殊字符（基本验证）
            assertTrue(hostName.matches("[a-zA-Z0-9._-]+"), 
                      "主机名应该只包含字母、数字、点、下划线和连字符");
        }
    }

    @Test
    @DisplayName("测试网络接口打印功能")
    void testPrintNetworkInterfaces() {
        // 验证方法可以正常执行不抛出异常
        assertDoesNotThrow(() -> IPUtil.printNetworkInterfaces(), 
                          "printNetworkInterfaces方法不应抛出异常");
        
        // 这个方法主要是用于调试输出，我们只验证它能正常执行
    }

    @Test
    @DisplayName("测试多次调用的一致性")
    void testConsistency() {
        // 测试多次调用getLocalIPv4()的结果一致性
        String firstIpv4 = IPUtil.getLocalIPv4();
        String secondIpv4 = IPUtil.getLocalIPv4();
        
        // 在短时间内调用应该返回相同的结果
        assertEquals(firstIpv4, secondIpv4, 
                    "短时间内多次调用getLocalIPv4()应该返回相同结果");
        
        // 测试getAllLocalIPv4()的一致性
        List<String> firstList = IPUtil.getAllLocalIPv4();
        List<String> secondList = IPUtil.getAllLocalIPv4();
        
        assertEquals(firstList.size(), secondList.size(), 
                    "多次调用getAllLocalIPv4()应该返回相同数量的地址");
        
        // 验证内容一致性
        assertTrue(firstList.containsAll(secondList) && secondList.containsAll(firstList),
                  "多次调用getAllLocalIPv4()应该返回相同的地址集合");
    }

    /**
     * 辅助方法：验证IPv4地址格式是否正确
     * @param ip 待验证的IP地址字符串
     */
    private void assertValidIPv4Format(String ip) {
        if (ip != null && !ip.isEmpty()) {
            // 基本的IPv4格式验证：四个由点分隔的数字组
            String[] parts = ip.split("\\.");
            assertEquals(4, parts.length, 
                        String.format("IP地址 %s 应该包含4个部分", ip));
            
            for (String part : parts) {
                try {
                    int num = Integer.parseInt(part);
                    assertTrue(num >= 0 && num <= 255, 
                              String.format("IP地址段 %s 应该在0-255范围内", part));
                } catch (NumberFormatException e) {
                    fail(String.format("IP地址段 %s 应该是有效的数字", part));
                }
            }
        }
    }
}