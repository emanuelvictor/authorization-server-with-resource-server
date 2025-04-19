package com.emanuelvictor.accessmanager.domain.entities;

import com.emanuelvictor.common.application.ports.secundaries.jpa.PersistentEntity;
import lombok.*;

import jakarta.persistence.*;

import static com.emanuelvictor.Main.DEFAULT_TENANT_IDENTIFICATION;

/**
 * @author Emanuel Victor
 * @version 1.0.0
 * @since 1.0.0, 10/09/2019
 */
@Entity
@Getter
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(schema = DEFAULT_TENANT_IDENTIFICATION, uniqueConstraints = {
        @UniqueConstraint(columnNames = {"group_id", "permission_id"})
})
public class GroupPermission extends PersistentEntity {

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private Permission permission;

    @ManyToOne(optional = false)
    @JoinColumn(name = "group_id")
    private Group group;

    public GroupPermission(Long id, Permission permission, Group group) {
        super(id);
        this.permission = permission;
        this.group = group;
    }

    public GroupPermission(Permission permission, Group group) {
        this.permission = permission;
        this.group = group;
    }

    public String getAuthority() {
        return permission.getAuthority();
    }

    public Long getGroupId() {
        return group.getId();
    }

    //    /**
//     * Constructor to not make recursive queries.
//     *
//     * @param id
//     * @param group
//     * @param permissionId
//     * @param permissionName
//     * @param permissionAuthority
//     * @param permissionDescription
//     */
//    public GroupPermission(final Long id, final Group group, final Long permissionId, final String permissionName, final String permissionAuthority, final String permissionDescription) {
//        this.id = id;
//        this.group = group;
//        this.permission = new Permission(permissionId, permissionName, permissionAuthority, permissionDescription);
//    }
}
