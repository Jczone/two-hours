package com.czj.service.com.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.czj.mapper.com.ExperimentMapper;
import com.czj.pojo.com.Experiment;
import com.czj.service.com.ExperimentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // 此处使用了mp提供的通用service模板
public class ExperimentServiceImpl extends ServiceImpl<ExperimentMapper, Experiment> implements ExperimentService {
    @Autowired
    private ExperimentMapper experimentMapper;

}
