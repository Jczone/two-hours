package com.czj.service.com.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.czj.mapper.com.NoticeAdmMapper;
import com.czj.pojo.com.NoticeAdm;
import com.czj.service.com.NoticeAdmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // 此处使用了mp提供的通用service模板
public class NoticeAdmServiceImpl extends ServiceImpl<NoticeAdmMapper, NoticeAdm> implements NoticeAdmService {
    @Autowired
    private NoticeAdmMapper noticeAdmMapper;

    @Override
    public IPage<NoticeAdm> getPage(int currentPage, int pageSize) {
        IPage<NoticeAdm> page = new Page<>(currentPage,pageSize);
        noticeAdmMapper.selectPage(page,null);
        return page;
    }

    @Override
    public IPage<NoticeAdm> getPageByCondition(String title, int currentPage, int pageSize) {
        // 封装查询条件
        QueryWrapper<NoticeAdm> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("title",title);
        IPage<NoticeAdm> page = new Page<>(currentPage,pageSize);
        noticeAdmMapper.selectPage(page,queryWrapper);
        return page;
    }
}
