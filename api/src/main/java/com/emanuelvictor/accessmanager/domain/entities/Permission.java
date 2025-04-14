package com.emanuelvictor.accessmanager.domain.entities;

import com.emanuelvictor.accessmanager.domain.entities.generic.EntityIdResolver;
import com.emanuelvictor.accessmanager.domain.entities.generic.PersistentEntity;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;


/**
 * @author Emanuel Victor
 * @version 1.0.0
 * @since 1.0.0, 10/09/2019
 */
@Entity
@Getter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, // TODO ACOPLAMENTO
        property = "id",
        scope = Permission.class,
        resolver = EntityIdResolver.class)
public class Permission extends PersistentEntity implements GrantedAuthority {

    @NotBlank
    @Column(nullable = false)
    private String name;

    @NotNull
    @Column(nullable = false, unique = true)
    private String authority;

    private String description;

    @JsonProperty
    @ManyToOne(fetch = FetchType.EAGER)
    private Permission upperPermission;

    public Permission() {
    }

    public Permission(Long id, String name, String authority, String description, Permission upperPermission) {
        super(id);
        this.name = name;
        this.authority = authority;
        this.description = description;
        this.upperPermission = upperPermission;
    }

    /**
     * @return Permission
     */
    public Permission copy() {
        return new Permission(id, name, authority, description, upperPermission);
    }

}
