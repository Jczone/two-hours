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
public class Discussion {
    // 讨论ID
    @TableId
    private Integer discussionId;
    // 所在课程ID
    private Integer courseId;
    // 创建者ID
    private String userId;
    // 标题
    private String title;
    // 内容
    private String content;
    // 点击量
    private Integer hits;
    // 点赞数
    private Integer likes;
    // 创建时间
    private Date createTime;
    // 格式化时间
    public String getFormatDate(){
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(createTime);
    }
}
