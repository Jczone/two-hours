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
public class Resource {
    // 资源ID
    @TableId
    private Integer resourceId;
    // 所在课程ID
    private Integer courseId;
    // 资源名称
    private String resourceName;
    // 文件大小
    private Double resourceSize;
    // 下载量
    private Integer downloadNum;
    // 创建时间
    private Date createTime;
    // 格式化时间
    public String getFormatDate(){
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(createTime);
    }
    // 文件大小double转字符串
    public String getResourceSizeStr(){
        resourceSize = (double)Math.round(resourceSize * 100)/100;
        // 保留两位小数
        if(resourceSize > 1024) {
            resourceSize = (double)Math.round(resourceSize*100/1024)/100;
            return  String.valueOf(resourceSize)+"MB";
        }
        return String.valueOf(resourceSize)+"KB";
    }
}
