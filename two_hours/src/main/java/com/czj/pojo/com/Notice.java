package com.czj.pojo.com;

import com.baomidou.mybatisplus.annotation.TableId;
import com.czj.util.TimeFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notice {
    // 通知ID
    @TableId
    private Integer noticeId;
    // 所在课程ID
    private Integer courseId;
    // 标题
    private String title;
    // 内容
    private String content;
    // 点击量
    private Integer hits;
    // 创建时间
    private Date createTime;
    // 格式化时间
    public String getFormatDate(){
        return TimeFormat.formatTimeToYMDHMS(createTime);
    }

}
