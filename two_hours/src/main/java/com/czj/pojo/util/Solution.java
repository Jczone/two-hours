package com.czj.pojo.util;

import com.baomidou.mybatisplus.annotation.TableId;
import com.czj.pojo.exam.AnswerOption;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Solution {

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
    // 选择/填空的项数量-常用于分别单选/多选
    private Integer answerNum;
    // 选择/填空的答案列表
    private List<AnswerOption> answerOptions;
    // 用户的答案-单选题的答案存于此，多选题的答案以bool方式存于对应选项的答案数据中
    private String answer;
    // 用户所获分数
    private Integer score;
    // 答案转化为bool类型-判断题用到
    public Boolean getAnswerBool(){
        return Objects.equals(answer, "1");
    }
    // 答案转化为字符串类型-判断题用到
    public String getAnswerStr(){
        return Objects.equals(answer, "1") ? "对":"错";
    }

}
