package com.czj.controller.user;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.czj.controller.util.DEA;
import com.czj.pojo.com.Chapter;
import com.czj.pojo.com.Course;
import com.czj.pojo.com.Resource;
import com.czj.service.com.ChapterService;
import com.czj.service.com.CourseService;
import com.czj.service.com.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/Course")
public class CourseCon {
    @Autowired
    private CourseService courseService;
    @Autowired
    private FileCon fileCon;
    @Autowired
    private ChapterService chapterService;
    @Autowired
    private ResourceService resourceService;
    // 默认课程封面路径
    @Value("${myProject.static.CourseCoverUrl}")
    private String CourseCoverUrlDefault;

    /**
     * 创建课程
     * @param course 课程数据
     */
    @PostMapping
    @RequestMapping("/save")
    public DEA createCourse(@RequestBody Course course, HttpServletRequest request){
        // 获取用户id
        HttpSession session = request.getSession();
        String userId = (String) session.getAttribute("userId");
        // 获取当前时间
        Date currentTime = new Date();
        // 默认封面
        if(Objects.equals(course.getCoverImg(), ""))course.setCoverImg(CourseCoverUrlDefault);
        // 组织数据
        course.setIsStart(0);
        course.setUserId(userId);
        course.setCreateTime(currentTime);
        return new DEA(courseService.save(course));
    }

    /**
     * 修改信息
     * @param course 数据表单
     * @return DEA
     */
    @RequestMapping("/updateInfo")
    @PostMapping
    public DEA updateInfo(@RequestBody Course course) {
        UpdateWrapper<Course> updateWrapper = new UpdateWrapper();
        // 设置查询类
        updateWrapper.eq("course_id", course.getCourseId());
        // 更新数据
        return new DEA(courseService.update(course,updateWrapper));
    }

    /**
     * 删除课程
     * @param course 包含id
     */
    @PostMapping("/deleteCourseById")
    public DEA deleteCourseById(@RequestBody Course course){
        // 清理课程封面
        Course courseCurrent = courseService.getById(course.getCourseId());
        if(courseCurrent.getCoverImg().contains(courseCurrent.getUserId())){
             fileCon.deleteCourseCoverImg(courseCurrent);
        }
        // 清理课程资料
        QueryWrapper<Resource> queryWrapperR = new QueryWrapper<>();
        queryWrapperR.eq("course_id", course.getCourseId());
        List<Resource> listR = resourceService.list(queryWrapperR);
        for(Resource item : listR){
            fileCon.resourceDelete(item);
        }
        // 清理课程章节
        QueryWrapper<Chapter> queryWrapperC = new QueryWrapper<>();
        queryWrapperC.eq("course_id", course.getCourseId());
        List<Chapter> listC = chapterService.list(queryWrapperC);
        for(Chapter item : listC){
            fileCon.deleteChapterVideo(item);
        }
        return new DEA(courseService.removeById(course.getCourseId()));
    }

}
