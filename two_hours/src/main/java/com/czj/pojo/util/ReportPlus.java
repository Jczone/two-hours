package com.czj.pojo.util;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportPlus {

    // 实验报告id
    @TableId
    private Integer reportId;
    // 对应实验id
    private Integer experimentId;
    // 用户id
    private String userId;
    // 用户名
    private String username;
    // 文件名
    private String fileName;
    // 创建时间
    private Date createTime;
    // 格式化时间
    public String getFormatDate(){
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(createTime);
    }
}
