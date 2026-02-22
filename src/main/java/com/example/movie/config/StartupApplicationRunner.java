package com.example.movie.config;


import com.example.movie.common.util.IPUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@Slf4j
@Component
public class StartupApplicationRunner implements ApplicationRunner {

    private final DataSource dataSource;
    private final Environment environment;

    public StartupApplicationRunner(DataSource dataSource, Environment environment) {
        this.dataSource = dataSource;
        this.environment = environment;
    }

    @Override
    public void run(ApplicationArguments args) {
        // 1. 检查数据库连接
        checkDatabaseConnection();

        // 2. 打印访问地址信息
        printAccessUrls();
    }

    private void checkDatabaseConnection() {
        try (Connection connection = dataSource.getConnection()) {
            if (connection.isValid(5)) {
                log.info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
                log.info("✅ 数据库连接正常");
                log.info("URL: {}", connection.getMetaData().getURL());
                log.info("版本: {}", connection.getMetaData().getDatabaseProductVersion());
            }
        } catch (SQLException e) {
            log.error("❌ 数据库连接失败: {}", e.getMessage());
        }
    }

    private void printAccessUrls() {
        String serverPort = environment.getProperty("server.port", "8080");
        String contextPath = environment.getProperty("server.servlet.context-path", "");

        // 获取本机的 IPv4 地址
        String mainIPAddress = IPUtil.getLocalIPv4();

        String localUrl = String.format("http://localhost:%s%s", serverPort, contextPath);
        String networkUrl = String.format("http://%s:%s%s", mainIPAddress, serverPort, contextPath);
        String knife4jUrl = localUrl + "/doc.html";

        log.info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        log.info("📋 API 文档与访问地址");
        log.info("本地访问: {}", localUrl);
        log.info("网络访问: {}", networkUrl);
        log.info("Knife4j:  {}", knife4jUrl);
        log.info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    }
}