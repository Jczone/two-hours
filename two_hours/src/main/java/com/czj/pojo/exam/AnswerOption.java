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
public class AnswerOption {

    // 答案项id
    @TableId
    private Integer optionId;
    // 答案id
    private Integer answerId;
    // 选择/填空的项序号
    private Integer num;
    // 用户的答案
    private String answer;
    // 用户所获分数
    private Integer score;
    // 多选题转化为bool
    public Boolean getAnswerBool(){
        return Objects.equals(answer, "1");
    }

}
