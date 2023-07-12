package com.czj.controller.util;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 处理服务器异常
 */
@RestControllerAdvice
public class ProExCon {

    /**
     * 拦截处理全局异常
     * @param ex 异常类型
     * @return DEA 异常消息
     */
    @ExceptionHandler
    public DEA doException(Exception ex){
        // 打印日志，便于调试
        ex.printStackTrace();
        // 返回异常信息
        return new DEA("服务出错，请稍后再试！");
    }
}
