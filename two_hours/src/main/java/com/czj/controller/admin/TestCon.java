package com.czj.controller.admin;

import com.czj.controller.util.DEA;
import com.czj.interceptor.PublicController;
import com.czj.service.com.RotationImgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/TestCon")
public class TestCon {
    @Autowired
    private RotationImgService rotationImgService;

    /**
     * 获取全部数据
     * @return 全部系统通知
     */
    @GetMapping
    @PublicController
    public DEA getAll(){
        return new DEA(rotationImgService.list());
    }


}
