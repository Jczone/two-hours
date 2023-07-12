package com.czj.service.exam.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.czj.mapper.exam.ExamMapper;
import com.czj.pojo.exam.Exam;
import com.czj.service.exam.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // 此处使用了mp提供的通用service模板
public class ExamServiceImpl extends ServiceImpl<ExamMapper, Exam> implements ExamService {
    @Autowired
    private ExamMapper examMapper;
}
