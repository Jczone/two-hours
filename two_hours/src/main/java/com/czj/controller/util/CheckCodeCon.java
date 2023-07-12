package com.czj.controller.util;

import com.czj.interceptor.PublicController;
import com.czj.util.CheckCodeUtil;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * 验证码服务
 * 生成验证码图片，并将值存入session
 */
@RestController
@RequestMapping("/checkCodeServlet")
public class CheckCodeCon {
    @GetMapping
    @PublicController
    public void getCheckCode(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // 获取session
        HttpSession session = request.getSession();
        // 生成验证码
        ServletOutputStream os = response.getOutputStream();
        String checkCode = CheckCodeUtil.outputVerifyImage(210, 80, os, 4);
        // 存入Session
        session.setAttribute("checkCodeStr",checkCode);
    }
}
