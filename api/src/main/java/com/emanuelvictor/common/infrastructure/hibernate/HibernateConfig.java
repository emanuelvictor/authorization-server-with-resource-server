package com.emanuelvictor.common.infrastructure.hibernate;

import com.emanuelvictor.common.infrastructure.hibernate.multitenant.MultiTenantConnectionProviderImpl;
import com.emanuelvictor.common.infrastructure.hibernate.multitenant.TenantIdentifierResolver;
import lombok.RequiredArgsConstructor;
import org.hibernate.cfg.Environment;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Configuration
@RequiredArgsConstructor
public class HibernateConfig {

    /**
     *
     */
    private final DataSource dataSource;

    /**
     *
     */
    private final org.springframework.core.env.Environment env;

    /**
     *
     */
    private final TenantIdentifierResolver tenantIdentifierResolver;

    /**
     *
     */
    private final MultiTenantConnectionProviderImpl multiTenantConnectionProviderImpl;

    /**
     * @return {@link JpaVendorAdapter}
     */
    @Bean
    JpaVendorAdapter jpaVendorAdapter() {
        return new HibernateJpaVendorAdapter();
    }

    /**
     * @return {@link LocalContainerEntityManagerFactoryBean}
     */
    @Bean
    @Primary
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {

        final LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource);
        em.setPackagesToScan(
                "com.emanuelvictor.accessmanager.domain.entities",
                "com.emanuelvictor.accessmanager.application.ports.secundaries.jpa",
                "com.emanuelvictor.tenants.application.ports.secundaries.jpa",
                "com.emanuelvictor.stock.application.ports.secundaries.jpa"
        );

        em.setJpaVendorAdapter(jpaVendorAdapter());

        final Map<String, Object> properties = new HashMap<>();
        properties.put(Environment.IMPLICIT_NAMING_STRATEGY, env.getProperty("spring.jpa.hibernate.naming.implicit-strategy"));
        properties.put(Environment.PHYSICAL_NAMING_STRATEGY, env.getProperty("spring.jpa.hibernate.naming.physical-strategy"));

        properties.put(Environment.NON_CONTEXTUAL_LOB_CREATION, env.getProperty("spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation"));
        properties.put(Environment.SHOW_SQL, env.getProperty("spring.jpa.show-sql"));
        properties.put(Environment.FORMAT_SQL, env.getProperty("spring.jpa.format_sql"));
        properties.put(Environment.HBM2DDL_AUTO, env.getProperty("spring.jpa.hibernate.ddl-auto"));
        properties.put(Environment.DIALECT, env.getProperty("spring.jpa.properties.hibernate.dialect"));
        properties.put(Environment.DEFAULT_NULL_ORDERING, env.getProperty("spring.jpa.properties.hibernate.order_by.default_null_ordering"));
        properties.put(Environment.MULTI_TENANT_CONNECTION_PROVIDER, multiTenantConnectionProviderImpl);
        properties.put(Environment.MULTI_TENANT_IDENTIFIER_RESOLVER, tenantIdentifierResolver);
        properties.put("hibernate.metadata_builder_contributor", env.getProperty("spring.jpa.properties.hibernate.metadata_builder_contributor"));

        em.setJpaPropertyMap(properties);

        return em;
    }

    /**
     *
     */
    @Configuration
    @RequiredArgsConstructor
    public static class TransactionManager {

        /**
         *
         */
        private final LocalContainerEntityManagerFactoryBean localContainerEntityManagerFactoryBean;

        /**
         * @return {@link PlatformTransactionManager}
         */
        @Primary
        @Bean
        public PlatformTransactionManager transactionManager() {
            final JpaTransactionManager transactionManager = new JpaTransactionManager();
            transactionManager.setEntityManagerFactory(localContainerEntityManagerFactoryBean.getObject());
            return transactionManager;
        }
    }
}