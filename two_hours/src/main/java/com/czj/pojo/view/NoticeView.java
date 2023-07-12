package com.czj.pojo.view;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NoticeView {
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
    // 发布教师姓名
    private String username;
    // 格式化时间
    public String getFormatDate(){
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(createTime);
    }
}
