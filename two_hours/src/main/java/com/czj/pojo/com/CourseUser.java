package com.czj.pojo.com;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseUser {
    // ID主键
    @TableId
    private Integer id;
    // 对应课程ID
    private Integer courseId;
    // 对应学生ID
    private String userId;
    // 资源下载数
    private Integer resDlNum;
    // 讨论创建数
    private Integer discussionCreateNum;
    // 章节观看时长
    private Integer chapterViewTime;
    // 章节观看次数
    private Integer chapterViewNum;
    // 发表回复数
    private Integer replyNum;
    // 创建时间
    private Date createTime;
    // 格式化时间
    public String getFormatDate(){
        if(null == createTime) createTime = new Date();
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(createTime);
    }
    // 格式化时间
    public String getFormatDateShort(){
        if(null == createTime) createTime = new Date();
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(createTime);
    }
    public CourseUser(Integer course, String user){
        this.courseId = course;
        this.userId = user;
    }
}
