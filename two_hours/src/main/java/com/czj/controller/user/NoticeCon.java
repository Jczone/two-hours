package com.czj.controller.user;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.czj.controller.util.DEA;
import com.czj.pojo.com.CourseUser;
import com.czj.pojo.com.Notice;
import com.czj.pojo.view.NoticeView;
import com.czj.service.com.CourseUserService;
import com.czj.service.com.NoticeService;
import com.czj.service.view.NoticeViewService;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/Notice")
public class NoticeCon {
    @Autowired
    private NoticeService noticeService;
    @Autowired
    private NoticeViewService noticeViewService;
    @Autowired
    private CourseUserService courseUserService;

    // 分页查询数据结构
    @ToString
    static class SearchForm{
        public String title;
        public int pageSize;
        public int currentPage;
    }

    /**
     * 分页条件查询课程中的通知
     * @return 数据集List
     */
    @PostMapping("/getNoticeByTitle")
    public DEA getNoticeByTitle(@RequestBody SearchForm searchNotice,HttpServletRequest request){
        // 获取课程id
        HttpSession session = request.getSession();
        int courseId = (int) session.getAttribute("courseId");
        String title = searchNotice.title;
        // 封装查询类
        QueryWrapper<NoticeView> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("title", title);
        queryWrapper.eq("course_id", courseId);
        queryWrapper.orderByDesc("create_time");
        // 查询页面总数
        int count = noticeViewService.count(queryWrapper);
        int currentPage = searchNotice.currentPage;
        int pageSize = searchNotice.pageSize;
        // 超界检测-默认归零
        if(count < (currentPage - 1) * pageSize){
            currentPage = 1;
        }
        // 封装分页信息
        IPage<NoticeView> page = new Page<>(currentPage,pageSize);
        return  new DEA(noticeViewService.page(page,queryWrapper));
    }

    /**
     * 查询用户所在课程最新的8条通知
     * @return 数据集
     */
    @GetMapping
    @RequestMapping("/getAll")
    public DEA getLatestEightNotice(HttpServletRequest request){
        // 获取用户id
        String userId = (String) request.getSession().getAttribute("userId");
        // 封装CourseUser查询类
        QueryWrapper<CourseUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        // 获取用户加入的课程id列表
        List<CourseUser> list = courseUserService.list(queryWrapper);
        List<Integer> idList = new LinkedList<>();
        for(CourseUser id : list){
            idList.add(id.getCourseId());
        }
        // 封装查询条件
        QueryWrapper<NoticeView> queryWrapperOfView = new QueryWrapper<>();
        queryWrapperOfView.in("course_id", idList);
        int size = 8;
        return  new DEA(noticeViewService.getLatestEightNotice(userId,size));
    }

    /**
     * 分页条件查询用户所在课程的通知
     * @return 数据集
     */
    @PostMapping
    @RequestMapping("/getPageByCondition")
    public DEA getPageByCondition(@RequestBody SearchForm searchNotice, HttpServletRequest request){
        // 获取用户id
        String userId = (String) request.getSession().getAttribute("userId");
        // 封装课程id查询类
        QueryWrapper<CourseUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        // 获取用户加入的课程id列表
        List<CourseUser> list = courseUserService.list(queryWrapper);
        List<Integer> idList = new LinkedList<>();
        for(CourseUser id : list){
            idList.add(id.getCourseId());
        }
        // 封装通知查询条件
        QueryWrapper<NoticeView> queryWrapperOfView = new QueryWrapper<>();
        queryWrapperOfView.in("course_id", idList);
        queryWrapperOfView.like("title", searchNotice.title);
        // 查询页面总数
        int count = noticeViewService.count(queryWrapperOfView);
        int currentPage = searchNotice.currentPage;
        int pageSize = searchNotice.pageSize;
        // 超界检测-默认归零
        if(count < (currentPage - 1) * pageSize){
            currentPage = 1;
        }
        // 封装分页信息
        IPage<NoticeView> page = new Page<>(currentPage,pageSize);
        return  new DEA(noticeViewService.page(page,queryWrapperOfView));
    }

    /**
     * 添加一条通知到数据库
     * @param notice 包含标题和内容
     * @return 成功标记
     */
    @PostMapping("/createNotice")
    public DEA createNotice(@RequestBody Notice notice, HttpServletRequest request){
        // 获取课程id
        HttpSession session = request.getSession();
        int courseId = (int) session.getAttribute("courseId");
        // 获取当前时间
        Date currentTime = new Date();
        notice.setCreateTime(currentTime);
        notice.setCourseId(courseId);
        notice.setHits(0);
        return  new DEA(noticeService.save(notice));
    }

    /**
     * 通知点击量增加
     * @param notice 讨论数据
     */
    @PostMapping("/addHits")
    public DEA addHits(@RequestBody Notice notice){
        Notice noticeCurrent = noticeService.getById(notice.getNoticeId());
        // 封装更新对象
        Notice noticeUpdate = new Notice();
        noticeUpdate.setHits(noticeCurrent.getHits()+1);
        // 封装查询类
        QueryWrapper<Notice> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("notice_id", noticeCurrent.getNoticeId());
        // 调用接口
        return new DEA(noticeService.update(noticeUpdate,queryWrapper));
    }

    /**
     * 更新通知
     * @param notice 包含标题、内容和通知id
     * @return 成功标记
     */
    @PostMapping("/updateNotice")
    public DEA updateNotice(@RequestBody Notice notice){
        return  new DEA(noticeService.updateById(notice));
    }

    /**
     * 删除一条通知
     * @param notice 包含id
     */
    @PostMapping("/deleteNoticeById")
    public DEA deleteNoticeById(@RequestBody Notice notice){
        return new DEA(noticeService.removeById(notice.getNoticeId()));
    }

    /**
     * 删除通知
     * @param id ID
     */
    @GetMapping("/deleteById/{id}")
    public DEA deleteById(@PathVariable("id") int id){
        return new DEA(noticeService.removeById(id));
    }
}
