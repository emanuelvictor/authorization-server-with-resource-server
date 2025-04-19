package com.emanuelvictor.common.infrastructure.filters;

public class TenantContext {
    private static final ThreadLocal<String> CURRENT_TENANT = new ThreadLocal<>();

    public static void setTenantIdentification(String tenantId) {
        CURRENT_TENANT.set(tenantId);
    }

    public static String getTenantIdentification() {
        return CURRENT_TENANT.get();
    }

    public static void clear() {
        CURRENT_TENANT.remove();
    }
}