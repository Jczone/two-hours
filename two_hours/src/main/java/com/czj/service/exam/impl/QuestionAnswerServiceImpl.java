package com.czj.service.exam.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.czj.mapper.exam.QuestionAnswerMapper;
import com.czj.pojo.exam.QuestionAnswer;
import com.czj.service.exam.QuestionAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // 此处使用了mp提供的通用service模板
public class QuestionAnswerServiceImpl extends ServiceImpl<QuestionAnswerMapper, QuestionAnswer> implements QuestionAnswerService {
    @Autowired
    private QuestionAnswerMapper questionAnswerMapper;
}
