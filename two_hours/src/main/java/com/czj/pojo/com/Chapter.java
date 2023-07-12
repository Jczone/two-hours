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
public class Chapter {
    // 资源ID
    @TableId
    private Integer chapterId;
    // 所在课程ID
    private Integer courseId;
    // 资源路径
    private String title;
    // 资源路径
    private String chapterUrl;
    // 播放量
    private Integer views;
    // 点赞量
    private Integer likes;
    // 创建时间
    private Date createTime;
    // 格式化时间
    public String getFormatDate(){
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(createTime);
    }
}
