package com.czj.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticConfig implements WebMvcConfigurer {

    // 项目静态资源绝对路径-用户目录
    @Value("${myProject.static.userFiles}")
    private String userFiles;

    // 项目静态资源绝对路径-图片
    @Value("${myProject.static.staticImgs}")
    private String staticImgs;

    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/imgs/**").addResourceLocations("file:" + staticImgs);
        registry.addResourceHandler("/files/user/**").addResourceLocations("file:" + userFiles);
    }
}

