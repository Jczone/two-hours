package com.czj.pojo.exam;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@NoArgsConstructor
public class Exam {

    // 类型
    public static Integer TTest = 1;
    public static Integer THomeWork = 2;
    public static Integer TExam = 3;

    // 考试id
    @TableId
    private Integer examId;
    // 所在课程
    private Integer courseId;
    // 发布者id
    private String authorId;
    // 类型 1-小测 2-作业 3-考试
    private Integer type;
    // 标题
    private String title;
    // 简介
    private String detail;
    // 打乱题序
    private Integer notOrder;
    // 开始日期
    private Date beginDate;
    // 截止日期
    private Date endDate;
    // 创建时间
    private Date createTime;
    // 题目顺序
    public Boolean getNotOrderBool(){
        return notOrder == 1 ;
    }
    // 格式化开始时间
    public String getFormatBeginDate(){
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(beginDate);
    }
    // 格式化截止时间
    public String getFormatEndDate(){
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(endDate);
    }
    // 格式化创建时间
    public String getFormatCreateDate(){
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(createTime);
    }

}
