package com.czj.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.czj.config.InitCourseConfig;
import com.czj.controller.admin.AdminCon;
import com.czj.controller.user.UserCon;
import com.czj.controller.util.DEA;
import com.czj.interceptor.PublicController;
import com.czj.pojo.com.CourseUser;
import com.czj.pojo.com.User;
import com.czj.service.com.CourseUserService;
import com.czj.util.SHAUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/LoginCon")
public class LoginCon {

    @Autowired
    private AdminCon adminCon;
    @Autowired
    private UserCon userCon;

    // 新用户注册默认头像
    @Value("${myProject.static.UserAvatarUrl}")
    private String UserAvatarUrlDefault;

    @Autowired
    private CourseUserService courseUserService;

    /**
     * 表单封装
     */
    static class Form {
        public String id;
        public String psw;
        public String verifyCode;
        public String type;
    }
    /**
     * 登陆分发服务
     * @param form 登陆表单
     * @param request 获取session
     * @return DEA
     */
    @PublicController
    @RequestMapping("/login")
    @PostMapping
    public DEA login(@RequestBody Form form, HttpServletRequest request){
        // 从Session获取验证码
        HttpSession session = request.getSession();
        String checkCodeGen = (String) session.getAttribute("checkCodeStr");
        // 检查验证码
        if( !form.verifyCode.equalsIgnoreCase(checkCodeGen)){
            return new DEA("验证码错误！");
        }
        else{
            DEA rs;
            // 封装查询条件
            Map<String,Object> map = new HashMap<String,Object>();
            map.put("password", SHAUtil.SHA256Encrypt(form.psw));
            // 验证账号密码
            switch (form.type){
                case "0":
                    // 管理员登陆
                    map.put("admin_id", form.id);
                    rs = adminCon.isAdminTrue(map);
                    break;
                case "1":
                    // 用户登陆
                    map.put("user_id", form.id);
                    rs = userCon.isUserTrue(map);
                    break;
                default:
                    return new DEA("用户类型错误！");
            }
            // 登陆失败信息
            if(!rs.isFlag()){
                rs.setMsg("账号密码错误!");
            }else{
                // 存入用户类型信息
                session.setAttribute("type", form.type);
                if(Objects.equals(form.type, "0")){
                    session.setAttribute("adminId", form.id);
                }else{
                    session.setAttribute("userId", form.id);
                }
            }
            return rs;
        }
    }
    /**
     * 注册服务
     * @param form 注册表单
     * @param request 获取session
     * @return DEA
     */
    @PublicController
    @RequestMapping("/register")
    @PostMapping
    public DEA register(@RequestBody Form form, HttpServletRequest request) {
        // 从Session获取验证码
        HttpSession session = request.getSession();
        String checkCodeGen = (String) session.getAttribute("checkCodeStr");
        // 检查验证码
        if( !form.verifyCode.equalsIgnoreCase(checkCodeGen)){
            return new DEA("验证码错误！");
        }
        else{
            DEA rs;
            // 插入注册数据
            Map<String,Object> map = new HashMap<String,Object>();
            map.put("user_id", form.id);
            // 检查ID重复
            if(userCon.isUserTrue(map).isFlag()){
                return new DEA("用户名已存在");
            }
            User newUser = new User(form.id,SHAUtil.SHA256Encrypt(form.psw));
            newUser.setUsername(form.id);
            // 默认头像
            newUser.setUserAvatar(UserAvatarUrlDefault);
            rs = userCon.insertUser(newUser);
            if(rs.isFlag()){
                rs.setMsg("注册成功！");
                // 插入新手课程
                for(int i : InitCourseConfig.courseIds){
                    CourseUser courseUser = new CourseUser(i,form.id);
                    courseUser.setCreateTime(new Date());
                    courseUserService.save(courseUser);
                }
            }else{
                rs.setMsg("注册失败！");
            }
            return rs;
        }
    }
    /**
     * 忘记密码 获取密保问题
     * @param form 数据表单
     * @return DEA
     */
    @PublicController
    @RequestMapping("/getQuestion")
    @PostMapping
    public DEA getQuestion(@RequestBody Form form) {
        DEA rs;
        // 封装查询类
        QueryWrapper<User> userQueryWrapper = new QueryWrapper();
        // 设置条件对等数据
        userQueryWrapper.eq("user_id", form.id);
        rs = userCon.getUserByCon(userQueryWrapper);
        return rs;
    }
    /**
     * 修改密码
     * @param form 数据表单
     * @return DEA
     */
    @PublicController
    @RequestMapping("/updatePsw")
    @PostMapping
    public DEA updatePsw(@RequestBody Form form) {
        DEA rs;
        User user = new User();
        UpdateWrapper<User> updateWrapper = new UpdateWrapper();
        // 设置密码
        user.setPassword(SHAUtil.SHA256Encrypt(form.psw));
        // 设置查询类
        updateWrapper.eq("user_id", form.id);
        // 更新数据
        rs = userCon.updateByCon(user,updateWrapper);
        return rs;
    }
    /**
     * 退出登陆，删除session
     * @return DEA
     */
    @RequestMapping("/loginOut")
    @GetMapping
    public DEA loginOut(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(Objects.equals(session.getAttribute("type"), "0")){
            session.removeAttribute("adminId");
        }else{ // 删除用户session信息
            session.removeAttribute("userId");
        }
        return new DEA(true,"操作成功！");
    }

}
