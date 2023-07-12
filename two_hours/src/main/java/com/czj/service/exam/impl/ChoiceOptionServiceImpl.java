package com.czj.service.exam.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.czj.mapper.exam.ChoiceOptionMapper;
import com.czj.pojo.exam.ChoiceOption;
import com.czj.service.exam.ChoiceOptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // 此处使用了mp提供的通用service模板
public class ChoiceOptionServiceImpl extends ServiceImpl<ChoiceOptionMapper, ChoiceOption> implements ChoiceOptionService {
    @Autowired
    private ChoiceOptionMapper choiceOptionMapper;
}
