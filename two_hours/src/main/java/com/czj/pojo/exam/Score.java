package com.czj.pojo.exam;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Score {

    // 分数id
    @TableId
    private Integer scoreId;
    // 对应考试id
    private Integer examId;
    // 用户id
    private String userId;
    // 总分
    private Integer score;
    // 客观题分数
    private Integer objectiveScore;
    // 是否被检查
    private Integer isChecked;
    // 系统评分
    private Integer systemChecked;
    // bool封装
    public boolean getIsCheckedBool(){
        return isChecked == 1;
    }
    // bool封装
    public boolean getSystemCheckedBool(){
        return systemChecked == 1;
    }

}
