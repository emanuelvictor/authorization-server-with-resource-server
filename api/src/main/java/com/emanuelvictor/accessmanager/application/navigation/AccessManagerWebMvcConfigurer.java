package com.emanuelvictor.accessmanager.application.navigation;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class AccessManagerWebMvcConfigurer implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addRedirectViewController("/access-manager", "/access-manager/");
        registry.addViewController("/access-manager/").setViewName("forward:/access-manager/index.html");
    }
}