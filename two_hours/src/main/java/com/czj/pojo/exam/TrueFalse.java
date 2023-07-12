package com.czj.pojo.exam;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@NoArgsConstructor
public class TrueFalse {

    // 题目id
    @TableId
    private Integer subjectId;
    // 题目内容
    private String content;
    // 答案 1真0假
    private String answer;
    // 解析
    private String analysis;
    // 分数
    private Integer score;
    // 答案格式化
    public String getAnswerStr(){
        return Objects.equals(answer, "1") ? "对":"错";
    }
    // 答案格式化
    public Boolean getAnswerBool(){
        return Objects.equals(answer, "1");
    }

}
