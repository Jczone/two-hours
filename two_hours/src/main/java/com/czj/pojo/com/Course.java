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
public class Course {
    // 主键
    @TableId
    private Integer courseId;
    // 课程名称
    private String courseName;
    // 创建用户id
    private String userId;
    // 是否开启
    private Integer isStart;
    // 是否公开
    private Integer isPublic;
    // 是否公开
    public Boolean getIsPublicBool(){
        return isPublic == 1;
    }
    // 是否开启
    public Boolean getIsStartBool(){
        return isStart == 1;
    }
    // 课程封面图路径
    private String coverImg;
    // 课程描述
    private String describes;
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
    // 是否公开
    public String getIsPublicStr(){
        return isPublic == 1? "公开" : "私有";
    }
    // 是否开启
    public String getIsStartStr(){
        return isStart == 1? "开启" : "关闭";
    }


}
