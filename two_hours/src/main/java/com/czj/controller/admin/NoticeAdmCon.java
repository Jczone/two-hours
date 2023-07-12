package com.czj.controller.admin;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.czj.controller.util.DEA;
import com.czj.interceptor.PublicController;
import com.czj.pojo.com.NoticeAdm;
import com.czj.service.com.NoticeAdmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@RestController
@RequestMapping("/NoticeAdm")
public class NoticeAdmCon {
    @Autowired
    private NoticeAdmService noticeAdmService;
    static class SearchNotice{
        public String title;
        public int pageSize;
        public int currentPage;
    }

    /**
     * 分页条件查询
     * @return 数据集
     */
    @PublicController
    @PostMapping("/getPageByCondition")
    public DEA getPageByCondition(@RequestBody SearchNotice searchNotice){
        // 封装查询条件
        String title = searchNotice.title;
        QueryWrapper<NoticeAdm> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("title",title);
        queryWrapper.orderByDesc("create_time");
        // 查询页面总数
        int count = noticeAdmService.count(queryWrapper);
        int currentPage = searchNotice.currentPage;
        int pageSize = searchNotice.pageSize;
        // 超界检测-默认归零
        if(count < (currentPage - 1) * pageSize){
            currentPage = 1;
        }
        // 100条  页面大小：20条/页  当前页码：10页（180-200条） 1页
        // 封装分页信息
        IPage<NoticeAdm> page = new Page<>(currentPage,pageSize);
        return  new DEA(noticeAdmService.page(page,queryWrapper));
    }

    /**
    * 通知点击量增加
    * @param noticeAdm 讨论数据
    */
    @PostMapping("/addHits")
    public DEA addHits(@RequestBody NoticeAdm noticeAdm){
        NoticeAdm noticeCurrent = noticeAdmService.getById(noticeAdm.getNoticeId());
        // 封装更新对象
        NoticeAdm noticeUpdate = new NoticeAdm();
        noticeUpdate.setHits(noticeCurrent.getHits()+1);
        // 封装查询类
        QueryWrapper<NoticeAdm> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("notice_id", noticeCurrent.getNoticeId());
        // 调用接口
        return new DEA(noticeAdmService.update(noticeUpdate,queryWrapper));
    }

    /**
     * 添加一条通知到数据库
     * @param noticeAdm 包含标题和内容
     * @return 成功标记
     */
    @PostMapping("/createNotice")
    public DEA createNotice(@RequestBody NoticeAdm noticeAdm,HttpServletRequest request){
        // 获取当前时间
        Date currentTime = new Date();
        noticeAdm.setCreateTime(currentTime);
        noticeAdm.setHits(0);
        noticeAdm.setAdminId((String) request.getSession().getAttribute("adminId"));
        return  new DEA(noticeAdmService.save(noticeAdm));
    }

    /**
     * 更新通知
     * @param noticeAdm 包含标题、内容和通知id
     * @return 成功标记
     */
    @PostMapping("/updateNotice")
    public DEA updateNotice(@RequestBody NoticeAdm noticeAdm){
       return new DEA(noticeAdmService.updateById(noticeAdm));
    }

    /**
     * 删除一条通知
     * @param noticeAdm 包含id
     */
    @PostMapping("/deleteNoticeById")
    public DEA deleteNoticeById(@RequestBody NoticeAdm noticeAdm){
        return new DEA(noticeAdmService.removeById(noticeAdm.getNoticeId()));
    }


}
