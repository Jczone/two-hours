package com.czj.service;

import com.czj.util.SHAUtil;
import com.sun.prism.impl.shape.ShapeUtil;
import org.junit.jupiter.api.Test;

public class AdminServiceTest {

    @Test
    public void sheTest(){
        String password = "asdf 1243fasdf";
        String pasad = SHAUtil.SHA256Encrypt(password);
        String cond2 = SHAUtil.SHAEncrypt(password);

        System.out.println(password);
        System.out.println(pasad);
        System.out.println(cond2);
        System.out.println("1234567890123456789012345678901234567890123456789012345678901234");
    }
}
