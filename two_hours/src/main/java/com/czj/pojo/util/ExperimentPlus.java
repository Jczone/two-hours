package com.czj.pojo.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExperimentPlus {

    // 实验id
    private Integer experimentId;
    // 报告id
    private Integer reportId;
    // 所在课程
    private Integer courseId;
    // 提交用户id
    private String userId;
    // 标题
    private String title;
    // 文件名
    private String fileName;
    // 任务书
    private String reportFile;
    // 创建时间
    private Date createTime;
    // 格式化时间
    public String getFormatDate(){
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(createTime);
    }
}
