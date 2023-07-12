package com.czj.service.exam.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.czj.mapper.exam.ChoiceMapper;
import com.czj.pojo.exam.Choice;
import com.czj.service.exam.ChoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // 此处使用了mp提供的通用service模板
public class ChoiceServiceImpl extends ServiceImpl<ChoiceMapper, Choice> implements ChoiceService {
    @Autowired
    private ChoiceMapper choiceMapper;
}
