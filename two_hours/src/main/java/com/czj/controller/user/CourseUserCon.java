package com.czj.controller.user;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.czj.controller.util.DEA;
import com.czj.interceptor.PublicController;
import com.czj.pojo.com.Course;
import com.czj.pojo.com.CourseUser;
import com.czj.pojo.view.CourseUserView;
import com.czj.service.com.CourseService;
import com.czj.service.com.CourseUserService;
import com.czj.service.view.CourseUserViewService;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;

@RestController
@RequestMapping("/CourseUser")
public class CourseUserCon {
    @Autowired
    private CourseService courseService;
    @Autowired
    private CourseUserService courseUserService;
    @Autowired
    private CourseUserViewService courseUserViewService;
    // 查询表单
    @ToString
    static class SearchForm{
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
    public DEA getPageByCondition(@RequestBody SearchForm searchForm, HttpServletRequest request){
        // 获取课程id
        HttpSession session = request.getSession();
        int courseId = (int) session.getAttribute("courseId");
        // 封装查询条件
        String username = searchForm.title;
        QueryWrapper<CourseUserView> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("username",username);
        queryWrapper.eq("course_id", courseId);
        queryWrapper.orderByDesc("create_time");
        // 查询页面总数
        int count = courseUserViewService.count(queryWrapper);
        int currentPage = searchForm.currentPage;
        int pageSize = searchForm.pageSize;
        // 超界检测-默认归零
        if(count < (currentPage - 1) * pageSize){
            currentPage = 1;
        }
        // 封装分页信息
        IPage<CourseUserView> page = new Page<>(currentPage,pageSize);
        return  new DEA(courseUserViewService.page(page,queryWrapper));
    }

    /**
     * 加入课程
     * @param courseUser 封装实体类
     * @return R
     */
    @PostMapping
    @RequestMapping("/save")
    public DEA save(@RequestBody CourseUser courseUser, HttpServletRequest request){
        // 验证课程开启
        Integer courseId = courseUser.getCourseId();
        Course course = courseService.getById(courseId);
        if (!course.getIsStartBool())return new DEA(true,"课程已关闭！");
        // 获取用户id
        HttpSession session = request.getSession();
        String userId = (String) session.getAttribute("userId");
        courseUser.setUserId(userId);
        courseUser.setCreateTime(new Date());
        return new DEA(courseUserService.save(courseUser));
    }
    /**
     * 退出课程
     * @param course 封装实体类
     * @return R
     */
    @PostMapping
    @RequestMapping("/quitCourse")
    public DEA quitCourse(@RequestBody Course course, HttpServletRequest request){
        // 获取用户id
        HttpSession session = request.getSession();
        String userId = (String) session.getAttribute("userId");
        // 封装查询类
        QueryWrapper<CourseUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("course_id", course.getCourseId());
        queryWrapper.eq("user_id", userId);
        return new DEA(courseUserService.remove(queryWrapper));
    }

    /**
     * 删除数据
     * @param id ID
     */
    @GetMapping("/deleteById/{id}")
    public DEA deleteById(@PathVariable("id") int id){
        return new DEA(courseUserService.removeById(id));
    }

}
