package com.czj.service.com.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.czj.mapper.com.RotationImgMapper;
import com.czj.pojo.com.RotationImg;
import com.czj.service.com.RotationImgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RotationImgServiceImpl extends ServiceImpl<RotationImgMapper, RotationImg> implements RotationImgService {
    @Autowired
    private RotationImgMapper rotationImgMapper;
}
