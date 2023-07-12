package com.czj.pojo.exam;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FillingBlank {

    // 填空id
    @TableId
    private Integer blankId;
    // 对应题目id
    private Integer subjectId;
    // 填空序号
    private Integer num;
    // 该空内容
    private String content;


}
