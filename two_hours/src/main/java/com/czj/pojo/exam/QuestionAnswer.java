package com.czj.pojo.exam;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class QuestionAnswer {

    // 题目id
    @TableId
    private Integer subjectId;
    // 题目内容
    private String content;
    // 答案
    private String answer;
    // 解析
    private String analysis;
    // 分数
    private Integer score;

}
