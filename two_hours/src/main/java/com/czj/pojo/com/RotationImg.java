package com.czj.pojo.com;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
// @TableName("th_rotationimg")
public class RotationImg {
    // 轮播图ID
    @TableId
    private Integer imgId;
    // 图片路径
    private String imgUrl;
    // 标题
    private String title;
    // 简介
    private String summary;
    // 详情
    private String details;
    // 创建时间
    private Date createTime;
    // 格式化时间
    public String getFormatDate(){
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(createTime);
    }
}
