package com.czj.pojo.util;

import com.czj.pojo.exam.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

/**
 * 包装题目类型
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Subject {
    // paper对应id
    private Integer paperId;
    // 题目id
    private Integer subjectId;
    // 题目序号
    private Integer subjectNum;
    // 题目类型 1-选择 2-填空 3-判断 4-简答
    private Integer subjectType;
    // 题目对象
    private Choice choice;
    private Filling filling;
    private QuestionAnswer questionAnswer;
    private TrueFalse trueFalse;
    // 项数组
    private List<ChoiceOption> choiceOptions;
    private List<FillingBlank> fillingBlanks;
    // 是否单选
    public boolean getIsSingleChoice(){
        if(choiceOptions != null){
            int ansNum = 0;
            for(ChoiceOption i:choiceOptions){
                if(i.getIsAnswerBool())ansNum++;
            }
            return ansNum <= 1;
        }
        return false;
    }
}
