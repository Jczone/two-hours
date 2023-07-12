package com.czj.pojo.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentExam {

    // 考试id
    private Integer examId;
    // 用户id
    private String userId;
    // 用户名
    private String username;
    // 头像路径
    private String userAvatar;
    // 已参与考试
    private boolean submit;
    // 总分
    private Integer score;
    // 客观题总分
    private Integer objectiveScore;
    // 是否被检查
    private Integer isChecked;
    // 系统评分状态
    private Integer systemChecked;
    // 用户答案列表
    private List<Solution> solutions;

    // bool封装
    public boolean getIsCheckedBool(){
        return isChecked == 1;
    }
    // bool封装
    public boolean getSystemCheckedBool(){
        return systemChecked == 1;
    }
}
