package com.emanuelvictor.common.infrastructure.hibernate.multitenant;

import com.emanuelvictor.common.infrastructure.filters.TenantContext;
import org.hibernate.context.spi.CurrentTenantIdentifierResolver;
import org.springframework.stereotype.Component;

import java.util.Objects;

import static com.emanuelvictor.Main.DEFAULT_TENANT_IDENTIFICATION;

@Component
public class TenantIdentifierResolver implements CurrentTenantIdentifierResolver<String> {

    @Override
    public String resolveCurrentTenantIdentifier() {
        return Objects.requireNonNullElse(TenantContext.getTenantIdentification(), DEFAULT_TENANT_IDENTIFICATION);
    }

    @Override
    public boolean validateExistingCurrentSessions() {
        return true;
    }

}
