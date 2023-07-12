package com.czj.config;

import com.czj.interceptor.ControllerInterceptor;
import com.czj.interceptor.LoginInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 登录拦截器路径
        String[] path = {"/**"};   // 设置拦截路径
        String[] excludePath = {"/files/**","/imgs/**"}; // 设置放行路径
        // 注册登陆拦截器
        registry.addInterceptor(new LoginInterceptor())
                .addPathPatterns(path)
                .excludePathPatterns(excludePath);
        // 全部服务拦截器-测试服务是否正常
        registry.addInterceptor(new ControllerInterceptor())
                .addPathPatterns("/**");
    }
}
