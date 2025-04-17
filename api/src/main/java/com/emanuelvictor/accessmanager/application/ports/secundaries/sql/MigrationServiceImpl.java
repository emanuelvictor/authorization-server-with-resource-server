package com.emanuelvictor.accessmanager.application.ports.secundaries.sql;

import com.emanuelvictor.accessmanager.application.adapters.migration.MigrationService;
import com.emanuelvictor.accessmanager.domain.entities.Tenant;
import com.emanuelvictor.accessmanager.application.ports.secundaries.jpa.TenantRepository;
import org.flywaydb.core.Flyway;
import org.flywaydb.core.api.configuration.FluentConfiguration;
import org.springframework.stereotype.Component;

@Component
public class MigrationServiceImpl implements MigrationService<String> {

    /**
     *
     */
    private final Flyway flyway;

    /**
     * @param flyway           {@link Flyway}
     * @param tenantRepository {@link TenantRepository}
     */
    public MigrationServiceImpl(Flyway flyway, TenantRepository tenantRepository) {
        this.flyway = flyway;
        tenantRepository.findAll().stream().map(Tenant::getIdentification).forEach(this::execute);
    }

    /**
     * Migrates the tenant.
     *
     * @param tenant String
     */
    public void execute(final String tenant) {
        new FluentConfiguration().configuration(flyway.getConfiguration()).schemas(tenant).load().migrate();
    }
}