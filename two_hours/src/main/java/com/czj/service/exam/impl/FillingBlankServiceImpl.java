package com.czj.service.exam.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.czj.mapper.exam.FillingBlankMapper;
import com.czj.pojo.exam.FillingBlank;
import com.czj.service.exam.FillingBlankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // 此处使用了mp提供的通用service模板
public class FillingBlankServiceImpl extends ServiceImpl<FillingBlankMapper, FillingBlank> implements FillingBlankService {
    @Autowired
    private FillingBlankMapper fillingBlankMapper;
}
