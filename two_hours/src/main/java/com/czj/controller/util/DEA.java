package com.czj.controller.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * 后端数据交互协议
 * 标准数据返回集
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DEA {
    // 操作状态标记
    private boolean flag;
    // 数据集
    private Object data;
    // 状态消息
    private String msg;

    // 项目以返回bool为主
    public DEA(boolean flag){
        this.flag = flag;
        this.data = null;
        if(flag){
            this.msg = "操作成功！";
        }else{
            this.msg = "操作失败！";
        }
    }
    // 项目以返回数据为主
    public DEA(Object data){
        this.data = data;
        if(data != null){
            this.flag = true;
            this.msg = "数据同步成功！";
        }else{
            this.flag = false;
            this.msg = "数据不存在！";
        }
    }
    // 异常返回信息
    public DEA(String msg){
        this.flag = false;
        this.data = null;
        this.msg = msg;
    }
    // 设置数据和信息并标记成功
    public DEA(Object data, String msg){
        this.flag = true;
        this.data = data;
        this.msg =msg;
    }
    // 设置标记并返回信息
    public DEA(boolean flag, String msg){
        this.flag = flag;
        this.data = null;
        this.msg = msg;
    }
}
