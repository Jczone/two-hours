package com.czj.controller.admin;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.czj.controller.util.DEA;
import com.czj.pojo.com.Admin;
import com.czj.service.com.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@RestController
@RequestMapping("/Admin")
public class AdminCon {
    @Autowired
    private AdminService adminService;

    /**
     * 检查管理员是否登陆
     * @return DEA(data=adminId)
     */
    @GetMapping
    @RequestMapping("/isAdminLogin")
    public DEA isAdminLogin(HttpServletRequest request){
        // 从Session获取用户ID
        HttpSession session = request.getSession();
        String adminId = (String) session.getAttribute("adminId");
        if(adminId == null){
            return new DEA("用户未登陆");
        }
        // 获取用户数据
        QueryWrapper<Admin> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("admin_id", adminId);
        return new DEA(adminService.getOne(queryWrapper));
    }

    /**
     * 通过多个键值对获取数据
     * @return R(flag)
     */
    @GetMapping("{map}")
    public DEA isAdminTrue(@PathVariable Map<String, Object> map){
        return new DEA(adminService.listByMap(map).size() != 0);
    }
}
