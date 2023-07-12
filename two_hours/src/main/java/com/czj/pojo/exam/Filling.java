package com.czj.pojo.exam;

import com.baomidou.mybatisplus.annotation.TableId;
import com.sun.org.apache.xpath.internal.operations.Bool;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Filling {

    // 题目id
    @TableId
    private Integer subjectId;
    // 题目内容
    private String content;
    // 答案个数
    private Integer answerNum;
    // 解析
    private String analysis;
    // 分数
    private Integer score;
    // 是否有序
    private Integer isOrder;
    // 是否大写
    private Integer isCapital;
    // 是否有序-bool
    public Boolean getIsOrderBool(){
        return isOrder == 1;
    }
    // 是否大写-bool
    public Boolean getIsCapitalBool(){
        return isCapital == 1;
    }

}
