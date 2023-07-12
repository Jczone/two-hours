package com.czj;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class TwoHoursApplication {

    public static ConfigurableApplicationContext ac;

    public static void main(String[] args) {
        ac = SpringApplication.run(TwoHoursApplication.class, args);
    }

}
