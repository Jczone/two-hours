package com.czj.service.exam.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.czj.mapper.exam.FillingMapper;
import com.czj.pojo.exam.Filling;
import com.czj.service.exam.FillingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // 此处使用了mp提供的通用service模板
public class FillingServiceImpl extends ServiceImpl<FillingMapper, Filling> implements FillingService {
    @Autowired
    private FillingMapper fillingMapper;
}
