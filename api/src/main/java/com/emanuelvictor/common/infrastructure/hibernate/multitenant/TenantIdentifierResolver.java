package com.emanuelvictor.common.infrastructure.hibernate.multitenant;

import lombok.Setter;
import org.hibernate.context.spi.CurrentTenantIdentifierResolver;
import org.springframework.stereotype.Component;

import static com.emanuelvictor.Main.DEFAULT_TENANT_ID;
import static com.emanuelvictor.common.infrastructure.aid.Utils.removeNoCache;

@Setter
@Component
public class TenantIdentifierResolver implements CurrentTenantIdentifierResolver<String> {

    private String schema = DEFAULT_TENANT_ID;

    @Override
    public String resolveCurrentTenantIdentifier() {
        return schema;
    }

    @Override
    public boolean validateExistingCurrentSessions() {
        return true;
    }

    public void setSchema(final String schema) {
        this.schema = removeNoCache(schema);
    }

}
