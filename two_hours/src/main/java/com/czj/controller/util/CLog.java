package com.czj.controller.util;

/**
 * 自定义日志
 */
public class CLog {
    public static void log(String info){
        System.out.println("-------------------------------------------------------");
        System.out.println("项目运行日志：" + info);
        System.out.println("-------------------------------------------------------");
    }
    public static void log(int info){
        System.out.println("-------------------------------------------------------");
        System.out.println("项目运行日志：" + info);
        System.out.println("-------------------------------------------------------");
    }
    public static void log(Object info){
        System.out.println("-------------------------------------------------------");
        System.out.println("项目运行日志：" + info.toString());
        System.out.println("-------------------------------------------------------");
    }
}
