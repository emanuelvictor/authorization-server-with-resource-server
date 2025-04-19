package com.emanuelvictor.common.infrastructure.beans;

import com.emanuelvictor.common.infrastructure.filters.TenantFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.JwtDecoder;

@Configuration
public class Beans {

    @Bean
    public FilterRegistrationBean<?> tenantFilter(final JwtDecoder jwtDecoder) {
        final FilterRegistrationBean<TenantFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new TenantFilter(jwtDecoder));
        registrationBean.addUrlPatterns("/api/*");
        return registrationBean;
    }

}
