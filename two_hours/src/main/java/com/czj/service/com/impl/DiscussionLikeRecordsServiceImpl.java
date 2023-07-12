package com.czj.service.com.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.czj.mapper.com.DiscussionLikeRecordsMapper;
import com.czj.pojo.com.DiscussionLikeRecords;
import com.czj.service.com.DiscussionLikeRecordsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // 此处使用了mp提供的通用service模板
public class DiscussionLikeRecordsServiceImpl extends ServiceImpl<DiscussionLikeRecordsMapper, DiscussionLikeRecords> implements DiscussionLikeRecordsService {
    @Autowired
    private DiscussionLikeRecordsMapper discussionLikeRecordsMapper;

}
