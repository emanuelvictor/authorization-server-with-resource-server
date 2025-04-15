package com.emanuelvictor.tenants.domain;

import lombok.Getter;

import java.util.UUID;

@Getter
public class Account {

    private final UUID id;
    private final String tenant;
    private final String login;
    private final Profile profile;

    public Account(String login, String tenant, Profile profile) {
        this.id = UUID.randomUUID();
        validateData(id, login, tenant, profile);
        this.login = login;
        this.tenant = tenant;
        this.profile = isOwnerOfTenant() ? Profile.MANAGER : profile;
    }

    public Account(UUID id, String login, String tenant, Profile profile) {
        validateData(id, login, tenant, profile);
        this.id = id;
        this.login = login;
        this.tenant = tenant;
        this.profile = isOwnerOfTenant() ? Profile.MANAGER : profile;
    }

    private static void validateData(UUID id, String login, final String tenant, Profile profile) {
        if (id == null)
            throw new RuntimeException("The Id of Account of Account is required");
        if (login == null)
            throw new RuntimeException("The Login of Account is required");
        if (tenant == null)
            throw new RuntimeException("The Tenant of Account is required");
        if (profile == null)
            throw new RuntimeException("The Profile of Account is required");
    }

    public Boolean isOwnerOfTenant() {
        return tenant.equals(login);
    }
}
