package com.emanuelvictor.accessmanager.domain.services;

import com.emanuelvictor.accessmanager.domain.entities.Group;
import com.emanuelvictor.accessmanager.domain.entities.GroupPermission;
import com.emanuelvictor.accessmanager.domain.entities.Permission;
import com.emanuelvictor.accessmanager.domain.repositories.GroupPermissionRepository;
import com.emanuelvictor.accessmanager.domain.repositories.GroupRepository;
import com.emanuelvictor.accessmanager.domain.repositories.PermissionRepository;

/**
 * @author Emanuel Victor
 * @version 1.0.0
 * @since 1.0.0, 09/09/2022
 * <p>
 * This service contains the algorithms to link a Permission with AccessGroup.
 * The service with the remove (unlink) algorithms is {@link UnlinkPermissionToGroupService}
 */
public class LinkPermissionToGroupService {

    private final GroupRepository groupRepository;
    private final PermissionRepository permissionRepository;
    private final GroupPermissionRepository groupPermissionRepository;


    public LinkPermissionToGroupService(GroupRepository groupRepository, PermissionRepository permissionRepository, GroupPermissionRepository groupPermissionRepository) {
        this.groupRepository = groupRepository;
        this.permissionRepository = permissionRepository;
        this.groupPermissionRepository = groupPermissionRepository;
    }

    //    @Transactional
    public void linkPermissionToGroup(final long groupId, final String authority) {
        final var group = groupRepository.findById(groupId).orElseThrow();
        final var permission = permissionRepository.findByAuthority(authority).orElseThrow();
        linkPermissionToGroup(group, permission);
    }

    public void linkPermissionToGroup(final long groupId, final long permissionId) { // TODO remove this method
        final var group = groupRepository.findById(groupId).orElseThrow();
        final var permission = permissionRepository.findById(permissionId).orElseThrow();
        linkPermissionToGroup(group, permission);
    }

    public void linkPermissionToGroup(final Group group, final Permission permission) {
        if (areAllTheSiblingsLinked(group, permission))
            linkPermissionToGroup(group, permission.getUpperPermission());
        else {
            unlinkLowerPermissionsFromPermission(group, permission);
            link(group, permission);
        }
    }

    void unlinkLowerPermissionsFromPermission(final Group group, final Permission permission) {
        final var lowerPermissions = permissionRepository
                .findByUpperPermissionId(permission.getId(), null).getContent();
        lowerPermissions.forEach(lowerPermission -> unlinkLowerPermissionsFromPermission(group, lowerPermission));
        groupPermissionRepository.deleteByGroupIdAndPermissionId(group.getId(), permission.getId());
    }

    boolean areAllTheSiblingsLinked(final Group group, final Permission permission) {
        if (permission.getUpperPermission() == null)
            return false;
        final var upperPermissionId = permission.getUpperPermission().getId();
        final var countNextPermissions = permissionRepository
                .findByUpperPermissionId(upperPermissionId, null).getSize();
        final var countNextLinkedPermissions = groupPermissionRepository
                .findByUpperPermissionIdAndGroupId(upperPermissionId, group.getId(), null).getSize();
        return countNextLinkedPermissions == (countNextPermissions - 1);
    }

    void link(final Group group, final Permission permission) {
        final GroupPermission groupPermission = new GroupPermission(permission, group);
        groupPermissionRepository.save(groupPermission);
    }

    void link(final long groupId, final String authority) {
        final var group = groupRepository.findById(groupId).orElseThrow();
        final var permission = permissionRepository.findByAuthority(authority).orElseThrow();
        link(group, permission);
    }

}
