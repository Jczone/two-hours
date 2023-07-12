package com.czj.pojo.exam;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Answer {

    // 答案id
    @TableId
    private Integer answerId;
    // 考试id
    private Integer examId;
    // 题目类型
    private Integer subjectType;
    // 题目id
    private Integer subjectId;
    // 题目序号
    private Integer subjectNum;
    // 考生id
    private String userId;
    // 选择/填空的项数量
    private Integer answerNum;
    // 用户的答案
    private String answer;
    // 用户所获分数
    private Integer score;
    // 答案转化为bool类型
    public Boolean getAnswerBool(){
        return Objects.equals(answer, "1");
    }

}
