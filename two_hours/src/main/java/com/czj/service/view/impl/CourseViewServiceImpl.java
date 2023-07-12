package com.czj.service.view.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.czj.mapper.view.CourseViewMapper;
import com.czj.pojo.view.CourseView;
import com.czj.service.view.CourseViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // 此处使用了mp提供的通用service模板
public class CourseViewServiceImpl extends ServiceImpl<CourseViewMapper, CourseView> implements CourseViewService {
    @Autowired
    private CourseViewMapper courseViewMapper;

}
