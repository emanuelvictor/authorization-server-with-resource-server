package com.emanuelvictor.accessmanager.domain.entity;


import com.emanuelvictor.accessmanager.domain.entities.Group;

import java.util.UUID;

public final class GroupBuilder {

    private Long id;
    private String name = UUID.randomUUID().toString();

    public Group build() {
        return new Group(id, name);
    }

    public GroupBuilder id(final Long id) {
        this.id = id;
        return this;
    }

    public GroupBuilder name(final String name) {
        this.name = name;
        return this;
    }

}
