package com.example.movie.common.util;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.example.movie.common.util.IPUtil.*;

@DisplayName("IPUtil工具类测试")
class IPUtilTest {

    @BeforeEach
    void setUp() {
        // 在每个测试方法运行前执行初始化操作（如果需要）
    }

    @Test
    @DisplayName("测试获取本机IP地址列表")
    void testGetLocalIpAddresses() {
        System.out.println("===== IPUtil Demo =====");
        System.out.println("Hostname      : " + getHostName());
        System.out.println("Primary IPv4  : " + getLocalIPv4());
        System.out.println("Primary IPv6  : " + getLocalIPv6());
        System.out.println("All IPv4      : " + getAllLocalIPv4());
        System.out.println();
        System.out.println("--- Network Interfaces ---");
        printNetworkInterfaces();
    }
}