package com.example.movie.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 1. 保留你原有的海报图片映射
        registry.addResourceHandler("/poster/**")
                .addResourceLocations("classpath:/poster/");

        // 2. 显式映射静态资源（Vue打包后的文件）
        // Spring Boot 默认会映射 /static/**，但显式配置更稳妥
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/");
    }

    /**
     * 解决 Vue Router HTML5 History 模式 404 问题
     * 强制将非 API 的未知请求重定向到 index.html
     */
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // 将不存在的路径（排除 api 和 poster）指向 index.html
        // 修复变量名重复问题，并涵盖多级路由
        // 1级路由映射：例如 /home -> /index.html
        registry.addViewController("/{path1:[^\\.]*}")
                .setViewName("forward:/index.html");

        // 2级路由映射：例如 /user/profile -> /index.html (排除 api 和 poster 目录)
        registry.addViewController("/{path1:^(?!api|poster).*}/{path2:[^\\.]*}")
                .setViewName("forward:/index.html");

        // 3级路由映射（如果你的 Vue 路由更深）：
        registry.addViewController("/{path1:^(?!api|poster).*}/{path2}/{path3:[^\\.]*}")
                .setViewName("forward:/index.html");
    }
}