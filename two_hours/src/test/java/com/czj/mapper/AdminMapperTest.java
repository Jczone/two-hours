package com.czj.mapper;

import com.czj.mapper.com.AdminMapper;
import com.czj.pojo.com.Admin;
import com.czj.service.view.NoticeViewService;
import com.czj.service.com.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.runner.RunWith;
import org.springframework.boot.SpringBootVersion;
import org.springframework.core.SpringVersion;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
public class AdminMapperTest {

    @Autowired
    private AdminMapper adminMapper;
    @Autowired
    private UserService userService;

    @Autowired
    private NoticeViewService noticeViewService;

    @Test
    void test(){
        adminMapper.insert(new Admin("12345678612","123456","null"));
    }

    @Test
    public void Test1(){
        String version = SpringVersion.getVersion();
        String version1 = SpringBootVersion.getVersion();
        System.out.println(version);
        System.out.println(version1);
    }


}
