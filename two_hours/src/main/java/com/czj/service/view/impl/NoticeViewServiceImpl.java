package com.czj.service.view.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.czj.mapper.view.NoticeViewMapper;
import com.czj.pojo.view.NoticeView;
import com.czj.service.view.NoticeViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // 此处使用了mp提供的通用service模板
public class NoticeViewServiceImpl extends ServiceImpl<NoticeViewMapper, NoticeView> implements NoticeViewService {
    @Autowired
    private NoticeViewMapper noticeViewMapper;

    @Override
    public List<NoticeView> getLatestEightNotice(String userId, int size) {
        return noticeViewMapper.getLatestEightNotice(userId,size);
    }
}
