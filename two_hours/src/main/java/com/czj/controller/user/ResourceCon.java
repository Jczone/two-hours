package com.czj.controller.user;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.czj.controller.util.DEA;
import com.czj.pojo.com.Resource;
import com.czj.service.com.ResourceService;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;

@RestController
@RequestMapping("/Resource")
public class ResourceCon {
    @Autowired
    private ResourceService resourceService;
    @Autowired
    private FileCon fileCon;

    // 查询类
    @ToString
    static class searchFileByName{
        public int pageSize;
        public String title;
        public int currentPage;
    }

    /**
     * 分页条件查询
     * @return 数据集
     */
    @PostMapping("/getPageByCondition")
    public DEA getPageByCondition(@RequestBody searchFileByName searchFile, HttpServletRequest request){
        // 获取课程id
        HttpSession session = request.getSession();
        int courseId = (int) session.getAttribute("courseId");
        String fileName = searchFile.title;
        // 封装查询类
        QueryWrapper<Resource> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("resource_name", fileName);
        queryWrapper.eq("course_id", courseId);
        queryWrapper.orderByDesc("create_time");
        // 查询页面总数
        int count = resourceService.count(queryWrapper);
        int currentPage = searchFile.currentPage;
        int pageSize = searchFile.pageSize;
        // 超界检测-默认当前页归零
        if(count < (currentPage - 1) * pageSize){
            currentPage = 1;
        }
        // 封装分页信息
        IPage<Resource> page = new Page<>(currentPage,pageSize);
        return  new DEA(resourceService.page(page,queryWrapper));
    }
    /**
     * 上传文件
     * @param resource 课程数据
     */
    @PostMapping
    @RequestMapping("/uploadOneFile")
    public DEA save(@RequestBody Resource resource, HttpServletRequest request){
        // 获取课程id
        HttpSession session = request.getSession();
        int courseId = (Integer) session.getAttribute("courseId");
        // 获取当前时间
        Date currentTime = new Date();
        // 组织数据
        resource.setCourseId(courseId);
        resource.setCreateTime(currentTime);
        return new DEA(resourceService.save(resource));
    }
    /**
     * 批量删除文件
     * @param selectIds 文件id数组
     */
    @PostMapping
    @RequestMapping("/deleteFileByIds")
    public DEA deleteFileByIds(@RequestBody Integer[] selectIds){
        return new DEA(resourceService.removeByIds(Arrays.asList(selectIds)));
    }
    /**
     * 删除文件
     * @param resource 文件
     */
    @PostMapping("/deleteFileById")
    public DEA deleteFileById(@RequestBody Resource resource){
        return new DEA(resourceService.removeById(resource.getResourceId()));
    }

    /**
     * 删除文件-标准接口-用于管理员
     * @param id ID
     */
    @GetMapping("/deleteById/{id}")
    public DEA deleteById(@PathVariable("id") int id){
        fileCon.resourceDelete(resourceService.getById(id));
        return new DEA(resourceService.removeById(id));
    }


    /**
     * 文件下载量增加
     * @param resource 文件
     */
    @PostMapping("/downloadNumAdd")
    public DEA downloadNumAdd(@RequestBody Resource resource){
        // 封装更新对象
        Resource resourceUpdate = new Resource();
        resourceUpdate.setDownloadNum(resource.getDownloadNum()+1);
        // 封装查询类
        QueryWrapper<Resource> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("resource_id", resource.getResourceId());
        // 调用接口
        return new DEA(resourceService.update(resourceUpdate,queryWrapper));
    }

}
