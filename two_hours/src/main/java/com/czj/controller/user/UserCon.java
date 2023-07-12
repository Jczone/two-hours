package com.czj.controller.user;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.czj.TwoHoursApplication;
import com.czj.controller.util.DEA;
import com.czj.interceptor.PublicController;
import com.czj.pojo.com.User;
import com.czj.service.com.UserService;
import com.czj.util.SHAUtil;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@RestController
@RequestMapping("/Users")
public class UserCon {
    @Autowired
    private UserService userService;
    // 查询表单
    @ToString
    static class SearchForm{
        public String userId;
        public String username;
        public int pageSize;
        public int currentPage;
    }

    /**
     * 分页条件查询
     * @return 数据集
     */
    @PostMapping("/getPageByUsername")
    public DEA getPageByUsername(@RequestBody SearchForm searchForm){
        // 封装查询条件
        String username = searchForm.username;
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("username",searchForm.username);
        queryWrapper.like("user_id",searchForm.userId);
        queryWrapper.orderByDesc("user_id");
        // 查询页面总数
        int count = userService.count(queryWrapper);
        int currentPage = searchForm.currentPage;
        int pageSize = searchForm.pageSize;
        // 超界检测-默认归零
        if(count < (currentPage - 1) * pageSize){
            currentPage = 1;
        }
        // 封装分页信息
        IPage<User> page = new Page<>(currentPage,pageSize);
        return  new DEA(userService.page(page,queryWrapper));
    }

    /**
     * 检查用户是否登陆
     * @return 用户数据
     */
    @GetMapping("/isUserLogin")
    public DEA isUserLogin(HttpServletRequest request){
        // 从Session获取用户ID
        HttpSession session = request.getSession();
        String userId = (String) session.getAttribute("userId");    // 1807004023
        if(userId == null){
            return new DEA("用户未登陆");
        }
        // 获取用户数据
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);     // where user_id=4023
        return new DEA(userService.getOne(queryWrapper));   // select * form th_user where user_id=4023
    }

    /**
     * 修改信息
     * @param user 数据表单
     * @return DEA
     */
    @PostMapping("/updateInfo")
    public DEA updateInfo(@RequestBody User user) {
        DEA rs;
        UpdateWrapper<User> updateWrapper = new UpdateWrapper();
        // 设置查询类
        updateWrapper.eq("user_id", user.getUserId());
        // 更新数据
        rs =  updateByCon(user,updateWrapper);
        return rs;
    }

    /**
     * 修改密码
     * @param user 数据表单
     * @return DEA
     */
    @PostMapping("/updatePsw")
    public DEA updatePsw(@RequestBody User user) {
        UpdateWrapper<User> updateWrapper = new UpdateWrapper();
        // 设置查询类
        updateWrapper.eq("user_id", user.getUserId());
        // 设置密码
        user.setPassword(SHAUtil.SHA256Encrypt(user.getPassword()));
        // 更新数据
        return new DEA(userService.update(user,updateWrapper));
    }

    /**
     * 新建账户
     * @param user 数据表单
     * @return DEA
     */
    @PostMapping("/createUser")
    public DEA createUser(@RequestBody User user) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        // 设置查询类
        queryWrapper.eq("user_id", user.getUserId());
        // 查询用户是否已存在
        if(userService.list(queryWrapper).size() != 0){
            return new DEA(false,"账号已存在！");
        }
        user.setUsername(user.getUserId());
        // 密码加密
        user.setPassword(SHAUtil.SHA256Encrypt(user.getPassword()));
        // 更新数据
        return new DEA(userService.save(user));
    }

    /**
     * 注销账户
     * @param user 包含id
     * @return DEA
     */
    @PostMapping("/deleteUser")
    public DEA deleteUser(@RequestBody User user) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id",user.getUserId());
        // 删除数据
        if(userService.remove(queryWrapper)){
            // 执行文件删除操作
            FileCon fileCon = TwoHoursApplication.ac.getBean(FileCon.class); // 获取Spring创建的Bean
            return new DEA(fileCon.userFileDelete(user.getUserId()));
        }else{
            return new DEA(false);
        }
    }

    /**
     * 获取用户名
     * @param user 数据表单
     * @return DEA userName
     */
    @RequestMapping("/getUserName")
    @PostMapping
    public DEA getUserName(@RequestBody User user) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", user.getUserId());
        return new DEA(userService.getOne(queryWrapper));
    }
    /**
     * 条件查询用户是否存在
     * @return DEA(flag)
     */
    public DEA isUserTrue(Map<String, Object> map){
        return new DEA(userService.listByMap(map).size() != 0);
    }
    /**
     * 插入数据
     * @param user 封装实体类
     * @return DEA
     */
    public DEA insertUser(User user){
        return new DEA(userService.save(user));
    }
    /**
     * 条件查询数据
     * @param userQueryWrapper 封装查询实体类
     * @return DEA
     */
    public DEA getUserByCon(QueryWrapper<User> userQueryWrapper){
        return new DEA(userService.getOne(userQueryWrapper));
    }
    /**
     * 条件更新数据
     * @param userUpdateWrapper 封装更新实体类
     * @return DEA
     */
    public DEA updateByCon(User user, UpdateWrapper<User> userUpdateWrapper){
        return new DEA(userService.update(user, userUpdateWrapper));
    }

}
