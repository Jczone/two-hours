package com.czj.service.view.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.czj.mapper.view.DiscussionViewMapper;
import com.czj.pojo.view.DiscussionView;
import com.czj.service.view.DiscussionViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // 此处使用了mp提供的通用service模板
public class DiscussionViewServiceImpl extends ServiceImpl<DiscussionViewMapper, DiscussionView> implements DiscussionViewService {
    @Autowired
    private DiscussionViewMapper discussionViewMapper;

}
