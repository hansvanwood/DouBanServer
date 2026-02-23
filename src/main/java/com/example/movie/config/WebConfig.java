package com.example.movie.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 意思是：当浏览器请求 /poster/xxx.jpg 时
        // 去 classpath (即 resources) 下的 poster 目录中寻找文件
        registry.addResourceHandler("/poster/**")
                .addResourceLocations("classpath:/poster/");
    }
}
