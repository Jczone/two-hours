package com.czj.service.com.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.czj.mapper.com.ReplyMapper;
import com.czj.pojo.com.Reply;
import com.czj.service.com.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // 此处使用了mp提供的通用service模板
public class ReplyServiceImpl extends ServiceImpl<ReplyMapper, Reply> implements ReplyService {
    @Autowired
    private ReplyMapper replyMapper;

}
