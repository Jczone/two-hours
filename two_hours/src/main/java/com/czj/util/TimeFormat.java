package com.czj.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class TimeFormat {

    /**
     * 格式化时间为 01-01 00:00 格式，若非当前年份，自动增加年份项
     * @param time Date类型时间
     * @return 字符串
     */
    public static String formatTimeToMDHM(Date time){
        // 获取当前年份
        int current = Integer.parseInt(new SimpleDateFormat("yyyy").format(new Date()));
        // 获取目标年份
        int timeY = Integer.parseInt(new SimpleDateFormat("yyyy").format(time));
        SimpleDateFormat sdf;
        if(current == timeY){   // 输出 MM-dd HH:mm
            sdf = new SimpleDateFormat("MM-dd HH:mm");
        }else{  // 输出 yyyy-MM-dd HH:mm
            sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        }
        sdf.setTimeZone(TimeZone.getTimeZone("GMT+0"));
        return sdf.format(time);
    }

    /**
     * 格式化时间为 1970-00-00 格式
     * @param time Date类型时间
     * @return 字符串
     */
    public static String formatTimeToYMD(Date time){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        sdf.setTimeZone(TimeZone.getTimeZone("GMT+0"));
        return sdf.format(time);
    }

    /**
     * 格式化时间为 1970-00-00 00:00:00 格式
     * @param time Date类型时间
     * @return 字符串
     */
    public static String formatTimeToYMDHMS(Date time){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        sdf.setTimeZone(TimeZone.getTimeZone("GMT+0"));
        return sdf.format(time);
    }

}
