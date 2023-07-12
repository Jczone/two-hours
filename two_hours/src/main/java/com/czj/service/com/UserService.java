package com.czj.service.com;

import com.baomidou.mybatisplus.extension.service.IService;
import com.czj.pojo.com.User;
import org.springframework.stereotype.Service;

@Service  // 注册一个service
public interface UserService extends IService<User> {

}