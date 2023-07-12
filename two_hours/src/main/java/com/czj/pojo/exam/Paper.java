package com.czj.pojo.exam;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Paper {
    // 四种试题类型
    public final static int TChoice = 1;
    public final static int TFilling = 2;
    public final static int TTrueFalse = 3;
    public final static int TQuestionAnswer = 4;

    // 试卷项id
    @TableId
    private Integer paperId;
    // 考试id
    private Integer examId;
    // 题目类型 1-选择 2-填空 3-判断 4-简答
    private Integer subjectType;
    // 题目id
    private Integer subjectId;
    // 题目序号
    private Integer subjectNum;

}
