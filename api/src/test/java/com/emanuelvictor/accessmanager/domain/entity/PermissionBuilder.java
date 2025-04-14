package com.emanuelvictor.accessmanager.domain.entity;


import com.emanuelvictor.accessmanager.domain.entities.Permission;

import java.util.UUID;

public final class PermissionBuilder {

    private Long id;
    private String name = UUID.randomUUID().toString();
    private String authority = UUID.randomUUID().toString();
    private String description = UUID.randomUUID().toString();
    private Permission upperPermission;

    public Permission build() {
        return new Permission(id, name, authority, description, upperPermission);
    }

    public PermissionBuilder id(final Long id) {
        this.id = id;
        return this;
    }

    public PermissionBuilder name(final String name) {
        this.name = name;
        return this;
    }

    public PermissionBuilder authority(final String authority) {
        this.authority = authority;
        return this;
    }

    public PermissionBuilder description(final String description) {
        this.description = description;
        return this;
    }

    public PermissionBuilder upperPermission(final Permission upperPermission) {
        this.upperPermission = upperPermission;
        return this;
    }

}
