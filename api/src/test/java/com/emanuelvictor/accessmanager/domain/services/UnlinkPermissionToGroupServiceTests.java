package com.emanuelvictor.accessmanager.domain.services;

import com.emanuelvictor.AbstractIntegrationTests;
import com.emanuelvictor.accessmanager.domain.entities.Group;
import com.emanuelvictor.accessmanager.domain.entities.GroupPermission;
import com.emanuelvictor.accessmanager.domain.entities.Permission;
import com.emanuelvictor.accessmanager.domain.entity.GroupBuilder;
import com.emanuelvictor.accessmanager.domain.entity.PermissionBuilder;
import com.emanuelvictor.accessmanager.domain.repositories.GroupPermissionRepository;
import com.emanuelvictor.accessmanager.domain.repositories.GroupRepository;
import com.emanuelvictor.accessmanager.domain.repositories.PermissionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

public class UnlinkPermissionToGroupServiceTests extends AbstractIntegrationTests {

    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private PermissionRepository permissionRepository;
    @Autowired
    private GroupPermissionRepository groupPermissionRepository;
    @Autowired
    private LinkPermissionToGroupService linkPermissionToGroupService;
    @Autowired
    private UnlinkPermissionToGroupService unlinkPermissionToGroupService;

    private final Group group = new GroupBuilder().build();

    @BeforeEach
    void setUp() {
        insertTreeOfPermissions();
        groupRepository.save(group);
    }

    /**
     * Deve desvincular uma permissão filha quando nenhum todos os irmãos estiverem vinculados
     */
    @Test
    void mustUnlinkChildPermissionWhenAllTheirSiblingsAreUnlinked() {
        final var childPermissionToBeUnlinked = "1.0.0";
        linkPermissionToGroupService.linkPermissionToGroup(group.getId(), childPermissionToBeUnlinked);
        assertThat(groupPermissionRepository.findByGroupId(group.getId(), null).getContent())
                .extracting(GroupPermission::getAuthority)
                .containsOnly(childPermissionToBeUnlinked);

        unlinkPermissionToGroupService.unlinkPermissionToGroup(group.getId(), childPermissionToBeUnlinked);

        assertThat(groupPermissionRepository.findByGroupId(group.getId(), null).getContent())
                .extracting(GroupPermission::getAuthority)
                .doesNotContain(childPermissionToBeUnlinked);
    }

    /**
     * Deve desvincular uma permissão filha quando apenas um dos outros 4 irmãos estiverem marcados
     */
    @Test
    void mustUnlinkChildPermissionWhenOneOfFourSiblingsAreLinked() {
        final var childPermissionToBeUnlinked = "1.0.0";
        final var childPermissionToBeKept = "1.0.1";
        linkPermissionToGroupService.linkPermissionToGroup(group.getId(), childPermissionToBeUnlinked);
        linkPermissionToGroupService.linkPermissionToGroup(group.getId(), childPermissionToBeKept);
        assertThat(groupPermissionRepository.findByGroupId(group.getId(), null).getContent())
                .extracting(GroupPermission::getAuthority)
                .containsOnly(childPermissionToBeUnlinked, childPermissionToBeKept);

        unlinkPermissionToGroupService.unlinkPermissionToGroup(group.getId(), childPermissionToBeUnlinked);

        assertThat(groupPermissionRepository.findByGroupId(group.getId(), null).getContent())
                .extracting(GroupPermission::getAuthority)
                .containsOnly(childPermissionToBeKept);
    }

    /**
     * Deve desvincular uma permissão filha quando TODOS os irmãos estiverem vinculados
     */
    @Test
    void mustUnlinkChildPermissionWhenAllTheirSiblingsAreLinked() {
        final var fatherPermission = "1.0";
        final var childPermissionToBeUnlinked = "1.0.0";
        final var childPermissionToBeKept1 = "1.0.1";
        final var childPermissionToBeKept2 = "1.0.2";
        final var childPermissionToBeKept3 = "1.0.3";
        final var childPermissionToBeKept4 = "1.0.4";
        linkPermissionToGroupService.linkPermissionToGroup(group.getId(), childPermissionToBeUnlinked);
        linkPermissionToGroupService.linkPermissionToGroup(group.getId(), childPermissionToBeKept1);
        linkPermissionToGroupService.linkPermissionToGroup(group.getId(), childPermissionToBeKept2);
        linkPermissionToGroupService.linkPermissionToGroup(group.getId(), childPermissionToBeKept3);
        linkPermissionToGroupService.linkPermissionToGroup(group.getId(), childPermissionToBeKept4);
        assertThat(groupPermissionRepository.findByGroupId(group.getId(), null).getContent())
                .extracting(GroupPermission::getAuthority)
                .containsOnly(fatherPermission);

        unlinkPermissionToGroupService.unlinkPermissionToGroup(group.getId(), childPermissionToBeUnlinked);

        assertThat(groupPermissionRepository.findByGroupId(group.getId(), null).getContent())
                .extracting(GroupPermission::getAuthority)
                .containsOnly(childPermissionToBeKept1, childPermissionToBeKept2, childPermissionToBeKept3, childPermissionToBeKept4);
    }

    private void insertTreeOfPermissions() {
        final Permission rootPermission = new PermissionBuilder().authority("1").build();
        permissionRepository.save(rootPermission);
        for (int i = 0; i < 5; i++) {
            final var childPermission = new PermissionBuilder()
                    .authority("1." + i)
                    .upperPermission(rootPermission)
                    .build();
            permissionRepository.save(childPermission);
            for (int j = 0; j < 5; j++) {
                final var grandChildPermission = new PermissionBuilder()
                        .authority("1." + i + "." + j)
                        .upperPermission(childPermission)
                        .build();
                permissionRepository.save(grandChildPermission);
            }
        }
    }
}
