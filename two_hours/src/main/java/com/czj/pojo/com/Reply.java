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
public class Reply {
    // 回复ID
    @TableId
    private Integer replyId;
    // 对应讨论ID 1
    private Integer discussionId;
    // 对应章节ID 2 1和2二选一
    private Integer chapterId;
    // 创建用户ID
    private String fromUid;
    // 回复目标用户ID
    private String toUid;
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
