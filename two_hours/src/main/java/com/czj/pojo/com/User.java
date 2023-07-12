package com.czj.pojo.com;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    // 用户ID
    private String userId;
    // 密码
    private String password;
    // 用户名称
    private String username;
    // 电话
    private String telephone;
    // 邮箱
    private String email;
    // 自定义问题1
    private String question1;
    // 答案1
    private String answer1;
    // 自定义问题2
    private String question2;
    // 答案2
    private String answer2;
    // 头像路径
    private String userAvatar;
    // 插入数据构造
    public User(String id, String psw){
        userId = id;
        password = psw;
    }
}
