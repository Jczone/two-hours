package com.czj.controller.user;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.czj.controller.util.DEA;
import com.czj.interceptor.PublicController;
import com.czj.pojo.com.Course;
import com.czj.pojo.com.CourseUser;
import com.czj.pojo.view.CourseView;
import com.czj.service.com.CourseUserService;
import com.czj.service.view.CourseViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/CourseView")
public class CourseViewCon {
    @Autowired
    private CourseViewService courseViewService;
    @Autowired
    private CourseUserService courseUserService;

    static class SearchCourse{
        public String courseName;
        public int pageSize;
        public int currentPage;
    }

    /**
     * 分页条件查询
     * @return 数据集
     */
    @PublicController
    @PostMapping("/getPageByCondition")
    public DEA getPageByCondition(@RequestBody SearchCourse searchCourse){
        // 封装查询条件
        String courseName = searchCourse.courseName;
        QueryWrapper<CourseView> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("course_name",courseName);
        queryWrapper.orderByDesc("create_time");
        // 查询页面总数
        int count = courseViewService.count(queryWrapper);
        int currentPage = searchCourse.currentPage;
        int pageSize = searchCourse.pageSize;
        // 超界检测-默认归零
        if(count < (currentPage - 1) * pageSize){
            currentPage = 1;
        }
        // 封装分页信息
        IPage<CourseView> page = new Page<>(currentPage,pageSize);
        return  new DEA(courseViewService.page(page,queryWrapper));
    }

    /**
     * 获取我学的课
     */
    @GetMapping
    @RequestMapping("/getMyJoinCourse")
    public DEA getMyJoinCourse(HttpServletRequest request){
        // 获取用户id
        HttpSession session = request.getSession();
        String userId = (String) session.getAttribute("userId");
        // 封装课程id查询类
        QueryWrapper<CourseUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        // 获取课程id列表
        List<CourseUser> list = courseUserService.list(queryWrapper);
        List<Integer> idList = new LinkedList<>();
        for(CourseUser id : list){
            idList.add(id.getCourseId());
        }
        if(idList.size() == 0){
            return new DEA(true,"未查询到数据！");
        }
        // 封装课程查询类
        QueryWrapper<CourseView> queryWrapperOfView = new QueryWrapper<>();
        queryWrapperOfView.in("course_id", idList);
        // 查询用户所选课程
        List<CourseView> courseList = courseViewService.list(queryWrapperOfView);
        // 排除已关闭课程
        List<CourseView> res = new ArrayList<>();
        for(CourseView i:courseList){
            if(i.getIsStartBool())res.add(i);
        }
        return new DEA(res);
    }
    /**
     * 获取我教的课
     */
    @GetMapping
    @RequestMapping("/getMyTeachCourse")
    public DEA getMyTeachCourse(HttpServletRequest request){
        // 获取用户id
        HttpSession session = request.getSession();
        String userId = (String) session.getAttribute("userId");
        // 封装查询类
        QueryWrapper<CourseView> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        // 查询用户所教课程
        return new DEA(courseViewService.list(queryWrapper));
    }
    /**
     * 条件查找课程
     */
    @PostMapping
    @RequestMapping("/selectCourseInfo")
    public DEA selectCourseInfo(@RequestBody Course course,HttpServletRequest request){
        // 获取用户id
        HttpSession session = request.getSession();
        String userId = (String) session.getAttribute("userId");
        // 封装查询类
        QueryWrapper<CourseView> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("course_name", course.getCourseName());
        // 查找课程
        return new DEA(courseViewService.list(queryWrapper));
    }
    /**
     * 添加courseId到session
     * @param courseView 课程id
     */
    @PostMapping
    @RequestMapping("/addCourseIdToSession")
    public DEA addCourseIdToSession(@RequestBody CourseView courseView, HttpServletRequest request){
        // 获取session
        HttpSession session = request.getSession();
        // 存入课程ID信息
        session.setAttribute("courseId", courseView.getCourseId());
        int courseId = (Integer) session.getAttribute("courseId");
        if(courseId > 0){
            return new DEA(true,"处理成功！");
        }else{
            return new DEA("处理失败！");
        }
    }
    /**
     * 获取课程信息
     */
    @GetMapping
    @RequestMapping("/getCourseInfo")
    public DEA getCourseInfo(HttpServletRequest request){
        // 获取课程ID
        HttpSession session = request.getSession();
        int courseId = (Integer) session.getAttribute("courseId");
        if(courseId > 0){   // 获取课程信息
            return new DEA(courseViewService.getById(courseId));    // select * from th_course_view where course_id=7
        }else{              // 课程数据错误或不存在
            return new DEA("处理失败！");
        }
    }
    /**
     * 获取课程信息
     */
    @PostMapping
    @RequestMapping("/getCourseInfoById")
    public DEA getCourseInfoById(@RequestBody Course course){
      return new DEA(courseViewService.getById(course.getCourseId()));
    }
}
