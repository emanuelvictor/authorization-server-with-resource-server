package com.emanuelvictor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main {

    static final public String DEFAULT_TENANT_IDENTIFICATION = "public";

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}