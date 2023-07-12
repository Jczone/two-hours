package com.czj.service.exam.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.czj.mapper.exam.TrueFalseMapper;
import com.czj.pojo.exam.TrueFalse;
import com.czj.service.exam.TrueFalseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // 此处使用了mp提供的通用service模板
public class TrueFalseServiceImpl extends ServiceImpl<TrueFalseMapper, TrueFalse> implements TrueFalseService {
    @Autowired
    private TrueFalseMapper trueFalseMapper;
}
