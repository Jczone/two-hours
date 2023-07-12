package com.czj.service.view.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.czj.mapper.view.CourseUserViewMapper;
import com.czj.pojo.view.CourseUserView;
import com.czj.service.view.CourseUserViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // 此处使用了mp提供的通用service模板
public class CourseUserViewServiceImpl extends ServiceImpl<CourseUserViewMapper, CourseUserView> implements CourseUserViewService {
    @Autowired
    private CourseUserViewMapper courseUserViewMapper;

}
