package com.czj.pojo.exam;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChoiceOption {

    // 选项id
    @TableId
    private Integer optionId;
    // 对应题目id
    private Integer subjectId;
    // 序号
    private Integer num;
    // 题目内容
    private String content;
    // 是否为答案
    private Integer isAnswer;
    // 是否为答案-布尔值
    public Boolean getIsAnswerBool(){
        return isAnswer == 1 ;
    }

}
