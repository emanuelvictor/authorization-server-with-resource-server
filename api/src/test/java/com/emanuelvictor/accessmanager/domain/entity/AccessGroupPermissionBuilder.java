package com.emanuelvictor.accessmanager.domain.entity;


import com.emanuelvictor.accessmanager.domain.entities.Group;
import com.emanuelvictor.accessmanager.domain.entities.GroupPermission;
import com.emanuelvictor.accessmanager.domain.entities.Permission;

public class AccessGroupPermissionBuilder {

    private Permission permission;
    private Group group;

    public AccessGroupPermissionBuilder() {
        this.permission = new PermissionBuilder().build();
        this.group = new GroupBuilder().build();
    }

    public AccessGroupPermissionBuilder permission(Permission permission) {
        this.permission = permission;
        return this;
    }

    public AccessGroupPermissionBuilder group(Group group) {
        this.group = group;
        return this;
    }

    public GroupPermission build() {
        return new GroupPermission(permission, group);
    }
}
