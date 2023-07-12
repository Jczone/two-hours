package com.czj.config;

import lombok.Data;

@Data
public class InitCourseConfig {
    // 新用户自动添加课程序列
    public static Integer[] courseIds = new Integer[5];

    static{
        courseIds[0] = 1;   // 新手教程
        courseIds[1] = 2;   // 计组
        courseIds[2] = 3;   // 微机原理
        courseIds[3] = 4;   // 单片机
        courseIds[4] = 5;   // 计算系统
    }
}
