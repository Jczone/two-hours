package com.czj.service.com.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.czj.mapper.com.CourseUserMapper;
import com.czj.pojo.com.CourseUser;
import com.czj.service.com.CourseUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // 此处使用了mp提供的通用service模板
public class CourseUserServiceImpl extends ServiceImpl<CourseUserMapper, CourseUser> implements CourseUserService {
    @Autowired
    private CourseUserMapper courseUserMapper;

}
