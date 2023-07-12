package com.czj.pojo.com;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Experiment {

    // 实验id
    @TableId
    private Integer experimentId;
    // 所在课程
    private Integer courseId;
    // 标题
    private String title;
    // 任务书文件名
    private String fileName;
    // 创建时间
    private Date createTime;
    // 格式化时间
    public String getFormatDate(){
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(createTime);
    }
}
