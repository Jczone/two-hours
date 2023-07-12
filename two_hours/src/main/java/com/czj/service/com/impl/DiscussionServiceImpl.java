package com.czj.service.com.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.czj.mapper.com.DiscussionMapper;
import com.czj.pojo.com.Discussion;
import com.czj.service.com.DiscussionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // 此处使用了mp提供的通用service模板
public class DiscussionServiceImpl extends ServiceImpl<DiscussionMapper, Discussion> implements DiscussionService {
    @Autowired
    private DiscussionMapper discussionMapper;

}
