package com.czj.service.exam.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.czj.mapper.exam.AnswerOptionMapper;
import com.czj.pojo.exam.AnswerOption;
import com.czj.service.exam.AnswerOptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // 此处使用了mp提供的通用service模板
public class AnswerOptionServiceImpl extends ServiceImpl<AnswerOptionMapper, AnswerOption> implements AnswerOptionService {
    @Autowired
    private AnswerOptionMapper answerOptionMapper;
}
