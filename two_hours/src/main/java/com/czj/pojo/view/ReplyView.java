package com.czj.pojo.view;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReplyView {
    // 回复ID
    @TableId
    private Integer replyId;
    // 对应讨论ID
    private Integer discussionId;
    // 对应章节ID
    private Integer chapterId;
    // 创建用户ID
    private String fromUid;
    // 目标用户ID
    private String toUid;
    // 创建用户名
    private String fromUsername;
    // 目标用户名
    private String toUsername;
    // 创建用户头像
    private String fromUserAvatar;
    // 内容
    private String content;
    // 创建时间
    private Date createTime;
    // 格式化时间
    public String getFormatDate(){
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(createTime);
    }
}
