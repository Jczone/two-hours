package com.czj.controller.user;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.czj.controller.util.DEA;
import com.czj.pojo.com.*;
import com.czj.pojo.util.ExperimentPlus;
import com.czj.pojo.util.ReportPlus;
import com.czj.pojo.util.SearchForm;
import com.czj.service.com.ExperimentService;
import com.czj.service.com.ReportService;
import com.czj.service.com.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/Experiment")
public class ExperimentCon {

    @Autowired
    private ExperimentService experimentService;
    @Autowired
    private ReportService reportService;
    @Autowired
    private UserService userService;

    /**
     * 创建实验
     * @param experiment 包含title和url
     * @return 成功标记
     */
    @PostMapping("/createExperiment")
    public DEA createExperiment(@RequestBody Experiment experiment, HttpServletRequest request){
        HttpSession session = request.getSession();
        int courseId = (int) session.getAttribute("courseId");
        Date date = new Date();
        experiment.setCourseId(courseId);
        experiment.setCreateTime(date);
        return new DEA(experimentService.save(experiment));
    }

    /**
     * 更新实验
     * @param experiment 包含id、title和fileName
     * @return 成功标记
     */
    @PostMapping("/updateExperiment")
    public DEA updateExperiment(@RequestBody Experiment experiment, HttpServletRequest request){
        return new DEA(experimentService.updateById(experiment));
    }

    /**
     * 分页条件查询实验
     * @return 数据集
     */
    @PostMapping("/getPageByCondition")
    public DEA getPageByCondition(@RequestBody SearchForm searchFile, HttpServletRequest request){
        // 获取课程id
        HttpSession session = request.getSession();
        int courseId = (int) session.getAttribute("courseId");
        String title = searchFile.title;
        // 封装查询类
        QueryWrapper<Experiment> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("title", title);
        queryWrapper.eq("course_id", courseId);
        queryWrapper.orderByDesc("create_time");
        // 查询页面总数
        int count = experimentService.count(queryWrapper);
        int currentPage = searchFile.currentPage;
        int pageSize = searchFile.pageSize;
        // 超界检测-默认当前页归零
        if(count < (currentPage - 1) * pageSize){
            currentPage = 1;
        }
        // 封装分页信息
        IPage<Experiment> page = new Page<>(currentPage,pageSize);
        return  new DEA(experimentService.page(page,queryWrapper));
    }

    /**
     * 分页条件查询报告
     * @return 数据集
     */
    @PostMapping("/getReportsByCondition")
    public DEA getReportsByCondition(@RequestBody SearchForm searchFile){
        // 获取实验id
        int experimentId = searchFile.id;
        // 封装查询类
        QueryWrapper<Report> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("experiment_id", experimentId);
        queryWrapper.orderByDesc("create_time");
        // 查询页面总数
        int count = reportService.count(queryWrapper);
        int currentPage = searchFile.currentPage;
        int pageSize = searchFile.pageSize;
        // 超界检测-默认当前页归零
        if(count < (currentPage - 1) * pageSize){
            currentPage = 1;
        }
        // 封装分页信息
        IPage<Report> page = new Page<>(currentPage,pageSize);
        page = reportService.page(page,queryWrapper);
        List<ReportPlus> list = new ArrayList<>();
        for(Report report : page.getRecords()){
            QueryWrapper<User> userQueryWrapper = new QueryWrapper<>();
            userQueryWrapper.eq("user_id",report.getUserId());
            String username = userService.getOne(userQueryWrapper).getUsername();
            System.out.println(username);
            ReportPlus reportPlus = new ReportPlus(
                report.getReportId(),
                report.getExperimentId(),
                report.getUserId(),
                username,
                report.getFileName(),
                report.getCreateTime()
            );
            list.add(reportPlus);
        }
        IPage<ReportPlus> plusIPage = new Page<>();
        plusIPage.setCurrent(page.getCurrent());
        plusIPage.setRecords(list);
        plusIPage.setSize(page.getSize());
        plusIPage.setTotal(page.getTotal());
        return new DEA(plusIPage);
    }

    /**
     * 删除实验
     * @param experiment 包含id
     * @return 成功标记
     */
    @PostMapping("/deleteOneById")
    public DEA deleteOneById(@RequestBody Experiment experiment){
        return new DEA(experimentService.removeById(experiment.getExperimentId()));
    }

    /**
     * 分页条件查询实验报告数据
     * @return 数据集
     */
    @PostMapping("/getPlusPageByCondition")
    public DEA getPlusPageByCondition(@RequestBody SearchForm searchFile, HttpServletRequest request){
        // 获取课程id
        HttpSession session = request.getSession();
        int courseId = (int) session.getAttribute("courseId");
        String title = searchFile.title;
        // 封装查询类
        QueryWrapper<Experiment> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("title", title);
        queryWrapper.eq("course_id", courseId);
        queryWrapper.orderByDesc("create_time");
        // 查询页面总数
        int count = experimentService.count(queryWrapper);
        int currentPage = searchFile.currentPage;
        int pageSize = searchFile.pageSize;
        // 超界检测-默认当前页归零
        if(count < (currentPage - 1) * pageSize){
            currentPage = 1;
        }
        // 封装分页信息
        IPage<Experiment> page = new Page<>(currentPage,pageSize);
        page = experimentService.page(page, queryWrapper);
        List<ExperimentPlus> experimentPluses = new ArrayList<>();
        for(Experiment experiment : page.getRecords()){
            String userId = (String) request.getSession().getAttribute("userId");
            QueryWrapper<Report> queryWrapper1 = new QueryWrapper<>();
            queryWrapper1.eq("experiment_id",experiment.getExperimentId());
            queryWrapper1.eq("user_id",userId);
            Report one = reportService.getOne(queryWrapper1);
            // 无提交记录-创建空记录
            if(one == null){
                Report report = new Report(null,experiment.getExperimentId(),userId,null,new Date());
                reportService.save(report);
                one = report;
            }
            ExperimentPlus experimentPlus = new ExperimentPlus(
                    experiment.getExperimentId(),
                    one.getReportId(),
                    experiment.getCourseId(),
                    one.getUserId(),
                    experiment.getTitle(),
                    experiment.getFileName(),
                    one.getFileName(),
                    experiment.getCreateTime()
            );
            experimentPluses.add(experimentPlus);
        }
        IPage<ExperimentPlus> plusIPage = new Page<>();
        plusIPage.setCurrent(page.getCurrent());
        plusIPage.setRecords(experimentPluses);
        plusIPage.setSize(page.getSize());
        plusIPage.setTotal(page.getTotal());
        return new DEA(plusIPage);
    }

    /**
     * 上传报告
     * @param report 包含id和fileName
     * @return 成功标记
     */
    @PostMapping("/uploadReport")
    public DEA uploadReport(@RequestBody Report report){
        UpdateWrapper<Report> wrapper = new UpdateWrapper<>();
        wrapper.eq("report_id", report.getReportId());
        wrapper.set("file_name",report.getFileName());
        System.out.println(report.getReportId());
        return new DEA(reportService.update(wrapper));
    }

}
