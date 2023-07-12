package com.czj.controller.exam;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.czj.controller.util.DEA;
import com.czj.pojo.exam.Exam;
import com.czj.pojo.util.SearchForm;
import com.czj.service.exam.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;

@RestController
@RequestMapping("/Exam")
public class ExamCon {

    @Autowired
    private ExamService examService;

    /**
     * 分页条件查询考试
     * @return 数据集
     */
    @PostMapping("/getExam")
    public DEA getExam(@RequestBody SearchForm searchForm, HttpServletRequest request){
        // 获取课程id
        HttpSession session = request.getSession();
        int courseId = (int) session.getAttribute("courseId");
        String title = searchForm.title;
        // 封装查询类
        QueryWrapper<Exam> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("title", title);
        queryWrapper.eq("course_id", courseId);
        queryWrapper.eq("type", Exam.TExam);
        queryWrapper.orderByAsc("begin_date");
        // 查询页面总数
        int count = examService.count(queryWrapper);
        int currentPage = searchForm.currentPage;
        int pageSize = searchForm.pageSize;
        // 超界检测-默认归零
        if(count < (currentPage - 1) * pageSize){
            currentPage = 1;
        }
        // 封装分页信息
        IPage<Exam> page = new Page<>(currentPage,pageSize);
        return  new DEA(examService.page(page,queryWrapper));
    }

    /**
     * 修改信息
     * @param exam 数据表单
     * @return DEA
     */
    @RequestMapping("/updateInfo")
    @PostMapping
    public DEA updateInfo(@RequestBody Exam exam) {
        UpdateWrapper<Exam> updateWrapper = new UpdateWrapper();
        // 设置查询类
        updateWrapper.eq("exam_id", exam.getExamId());
        // 更新数据
        return new DEA(examService.update(exam,updateWrapper));
    }

    /**
     * 创建一条考试
     * @param exam 包含考试的名称，描述，起止时间，类型，有序
     * @return 成功标记
     */
    @PostMapping("/createExam")
    public DEA createExam(@RequestBody Exam exam, HttpServletRequest request){
        // 获取发布者，课程ID，及创建时间
        exam.setAuthorId((String) request.getSession().getAttribute("userId"));
        exam.setCourseId((Integer) request.getSession().getAttribute("courseId"));
        exam.setCreateTime(new Date());
        return new DEA(examService.save(exam));
    }

    /**
     * 更新一条考试
     * @param exam 包含考试的id，名称，描述，起止时间，类型，有序
     * @return 成功标记
     */
    @PostMapping("/updateExam")
    public DEA updateExam(@RequestBody Exam exam){
        // 获取发布者，课程ID，及创建时间
        exam.setCreateTime(new Date());
        return new DEA(examService.updateById(exam));
    }

    /**
     * 获取一条考试信息
     * @param exam 包含id
     * @return 讨论信息
     */
    @PostMapping("/getExamById")
    public DEA getExamById(@RequestBody Exam exam){
        return new DEA(examService.getById(exam.getExamId()));
    }

    /**
     * 删除考试 todo 相关数据清理工作未完成
     * @param exam 包含id
     */
    @PostMapping("/deleteExamById")
    public DEA deleteExamById(@RequestBody Exam exam){
        // todo todo todo
        // todo 删除考试前应当清理掉考试相关的全部数据
        // todo todo todo
        return new DEA(examService.removeById(exam.getExamId()));
    }
}
