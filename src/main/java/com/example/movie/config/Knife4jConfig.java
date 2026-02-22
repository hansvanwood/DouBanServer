package com.example.movie.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Knife4j 接口文档配置
 */
@Configuration
public class Knife4jConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("豆瓣电影查询系统 API")
                        .description("豆瓣电影查询系统后端接口文档，提供电影查询、评论查看、工作者信息等功能")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("movie-api")
                                .url("http://localhost:8080/doc.html")));
    }
}
