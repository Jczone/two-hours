package com.czj.service.com.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.czj.mapper.com.ReportMapper;
import com.czj.pojo.com.Report;
import com.czj.service.com.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // 此处使用了mp提供的通用service模板
public class ReportServiceImpl extends ServiceImpl<ReportMapper, Report> implements ReportService {
    @Autowired
    private ReportMapper reportMapper;

}
