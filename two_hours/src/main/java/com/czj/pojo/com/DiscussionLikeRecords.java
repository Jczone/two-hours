package com.czj.pojo.com;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DiscussionLikeRecords {

    @TableId
    private Integer recordId;
    private Integer discussionId;
    private String userId;

}
