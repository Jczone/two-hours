package com.czj.service.view.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.czj.mapper.view.ReplyViewMapper;
import com.czj.pojo.view.ReplyView;
import com.czj.service.view.ReplyViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // 此处使用了mp提供的通用service模板
public class ReplyViewServiceImpl extends ServiceImpl<ReplyViewMapper, ReplyView> implements ReplyViewService {
    @Autowired
    private ReplyViewMapper replyViewMapper;

}
