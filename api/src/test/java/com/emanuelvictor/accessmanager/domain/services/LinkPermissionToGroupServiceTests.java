package com.emanuelvictor.accessmanager.domain.services;

import com.emanuelvictor.SpringBootTests;
import com.emanuelvictor.accessmanager.domain.entities.Group;
import com.emanuelvictor.accessmanager.domain.entities.GroupPermission;
import com.emanuelvictor.accessmanager.domain.entities.Permission;
import com.emanuelvictor.common.domain.entities.PersistentEntity;
import com.emanuelvictor.accessmanager.domain.entity.GroupBuilder;
import com.emanuelvictor.accessmanager.domain.entity.PermissionBuilder;
import com.emanuelvictor.accessmanager.application.ports.secundaries.jpa.GroupPermissionRepository;
import com.emanuelvictor.accessmanager.application.ports.secundaries.jpa.GroupRepository;
import com.emanuelvictor.accessmanager.application.ports.secundaries.jpa.PermissionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

public class LinkPermissionToGroupServiceTests extends SpringBootTests {

    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private PermissionRepository permissionRepository;
    @Autowired
    private GroupPermissionRepository groupPermissionRepository;
    @Autowired
    private LinkPermissionToGroupService linkPermissionToGroupService;

    private final Group group = new GroupBuilder().build();
    private Permission rootPermission;

    @BeforeEach
    void setUp() {
        insertTreeOfPermissions();
        groupRepository.save(group);
    }

    @Test
    void mustLinkToRootPermission() {

        linkPermissionToGroupService.linkPermissionToGroup(group, rootPermission);

        final var permissionsOfGroup = groupPermissionRepository.findByGroupId(group.getId(), null);
        assertThat(permissionsOfGroup.getSize()).isEqualTo(1);
        assertThat(permissionsOfGroup.getContent())
                .extracting(GroupPermission::getPermission)
                .extracting(PersistentEntity::getId)
                .containsExactly(rootPermission.getId());
    }

    /**
     * Deve deslincar todos os filhos quando o avô é lincado
     */
    @Test
    void mustUnlinkAllChildrenWhenTheGrandFatherBeLinked() {
        linkAllTheFatherPermissionsToGroup();

        linkPermissionToGroupService.linkPermissionToGroup(group.getId(), rootPermission.getId());

        final var permissionsOfGroup = groupPermissionRepository.findByGroupId(group.getId(), null);
        assertThat(permissionsOfGroup.getContent())
                .extracting(GroupPermission::getPermission)
                .extracting(PersistentEntity::getId)
                .containsExactly(rootPermission.getId());
    }

    /**
     * Deve lincar o pai quando todos os irmãos forem lincados
     */
    @Test
    void mustLinkToFatherWhenAllTheSiblingsAreLinked() {
        linkAllTheFatherPermissionsToGroup();
        final var unmarkedPermission = insertDetachedPermissionChildOfRootPermission();
        // Verify if the unmarkedPermission is actually unlinked to group.
        assertThat(groupPermissionRepository.findByGroupIdAndPermissionId(group.getId(), unmarkedPermission.getId())).isNull();

        linkPermissionToGroupService.linkPermissionToGroup(group, unmarkedPermission);

        final var permissionsOfGroup = groupPermissionRepository.findByGroupId(group.getId(), null);
        assertThat(permissionsOfGroup.getSize()).isEqualTo(1);
        assertThat(permissionsOfGroup.getContent())
                .extracting(GroupPermission::getPermission)
                .extracting(PersistentEntity::getId)
                .containsExactly(rootPermission.getId());
    }

    /**
     * Deve lincar o avô quando os irmãos dos netos forem licados
     */
    @Test
    void mustLinkToGrandfatherWhenAllTheSiblingsOfGrandchildrenAreLinked() {
        linkAllTheFatherPermissionsToGroup();
        final var fatherDetachedPermission = insertDetachedPermissionChildOfRootPermission();
        final var grandchildDetachedPermission = new PermissionBuilder()
                .upperPermission(fatherDetachedPermission)
                .build();
        permissionRepository.save(grandchildDetachedPermission);

        linkPermissionToGroupService.linkPermissionToGroup(group, grandchildDetachedPermission);

        final var permissionsOfGroup = groupPermissionRepository.findByGroupId(group.getId(), null);
        assertThat(permissionsOfGroup.getSize()).isEqualTo(1);
        assertThat(permissionsOfGroup.getContent())
                .extracting(GroupPermission::getPermission)
                .extracting(PersistentEntity::getId)
                .containsExactly(rootPermission.getId());
    }

    @Test
    void mustUnlinkAllLowerPermissionFromGroupId() {
        linkAllTheFatherPermissionsToGroup();
        final var groupPermissionCreatedBeforeUnlinking = groupPermissionRepository.findByGroupId(group.getId(), null);

        // Unlink father permissions
        for (int i = 0; i < 5; i++) {
            final var permissionToUnlink = permissionRepository.findByAuthority("1." + i).orElseThrow();
            linkPermissionToGroupService.unlinkLowerPermissionsFromPermission(group, permissionToUnlink);
        }

        assertThat(groupPermissionCreatedBeforeUnlinking.getContent().size()).isEqualTo(30);
        final var groupPermissionByIdAfterRemovingLowerPermissions = groupPermissionRepository.findByGroupId(group.getId(), null);
        assertThat(groupPermissionByIdAfterRemovingLowerPermissions.getContent()).isEmpty();
    }

    /**
     * Deve desmarcar o avô quando o único neto for desmarcado.
     */
    @Test
    void mustUnlinkTheGrandfatherWhenTheUniqueGrandchildHasBeenUnlinked() {
        final var childPermissionLinked = permissionRepository.findByAuthority("1.0.0").orElseThrow();
        assertThat(groupPermissionRepository.findByGroupId(group.getId(), null)).isEmpty();
        linkPermissionToGroupService.linkPermissionToGroup(group, childPermissionLinked);
        assertThat(groupPermissionRepository.findByGroupId(group.getId(), null)).isNotEmpty();

        linkPermissionToGroupService.unlinkLowerPermissionsFromPermission(group, childPermissionLinked);

        assertThat(groupPermissionRepository.findByGroupId(group.getId(), null)).isEmpty();
    }

    /**
     * Deve desmarcar o único neto qunado desmarcarmos o avô
     */
    @Test
    void mustUnlinkTheUniqueGrandchildWhenWeUnlikedTheGrandfatherPermission() {
        final var childPermissionLinked = permissionRepository.findByAuthority("1.0.0").orElseThrow();
        linkPermissionToGroupService.linkPermissionToGroup(group, childPermissionLinked);
        assertThat(groupPermissionRepository.findByGroupId(group.getId(), null)).isNotEmpty();

        linkPermissionToGroupService.unlinkLowerPermissionsFromPermission(group, rootPermission);

        assertThat(groupPermissionRepository.findByGroupId(group.getId(), null)).isEmpty();
    }

    /**
     * Deve desmarcar o único neto qunado deslincarmos o pai.
     */
    @Test
    void mustUnlinkTheUniqueGrandchildWhenWeUnlikedTheFatherPermission() {
        final var childPermissionLinked = permissionRepository.findByAuthority("1.0.0").orElseThrow();
        assertThat(groupPermissionRepository.findByGroupId(group.getId(), null)).isEmpty();
        linkPermissionToGroupService.linkPermissionToGroup(group, childPermissionLinked);
        assertThat(groupPermissionRepository.findByGroupId(group.getId(), null)).isNotEmpty();
        final var fatherPermission = permissionRepository.findByAuthority("1.0").orElseThrow();

        linkPermissionToGroupService.unlinkLowerPermissionsFromPermission(group, fatherPermission);

        assertThat(groupPermissionRepository.findByGroupId(group.getId(), null)).isEmpty();
    }

    /**
     * Deve desmarcar o avô quando o único neto for desmarcado.
     */
    @Test
    void weNeedToKeepTheOtherFathersTreeWhenWeTheFatherPermission() {
        final var authorityFromFatherPermissionLinked = "1.0";
        final var authorityChildOfOtherFatherPermissionLinked = "1.4.2";
        final var fatherPermissionLinked = permissionRepository.findByAuthority(authorityFromFatherPermissionLinked).orElseThrow();
        linkPermissionToGroupService.linkPermissionToGroup(group, fatherPermissionLinked);
        final var childOfOtherFatherPermissionLinked = permissionRepository.findByAuthority(authorityChildOfOtherFatherPermissionLinked).orElseThrow();
        linkPermissionToGroupService.linkPermissionToGroup(group, childOfOtherFatherPermissionLinked);
        // Verify if group is linked with father "1.0" and child "1.4.2"
        assertThat(groupPermissionRepository.findByGroupId(group.getId(), null))
                .extracting(GroupPermission::getPermission)
                .extracting(Permission::getAuthority)
                .containsExactly(authorityFromFatherPermissionLinked, authorityChildOfOtherFatherPermissionLinked);

        linkPermissionToGroupService.unlinkLowerPermissionsFromPermission(group, fatherPermissionLinked);

        // Verify if group is linked with grandchild "1.4.2"
        assertThat(groupPermissionRepository.findByGroupId(group.getId(), null))
                .extracting(GroupPermission::getPermission)
                .extracting(Permission::getAuthority)
                .containsExactly(authorityChildOfOtherFatherPermissionLinked);
        // Verify if group is unlinked with father "1.0"
        assertThat(groupPermissionRepository.findByGroupId(group.getId(), null))
                .extracting(GroupPermission::getPermission)
                .extracting(Permission::getAuthority)
                .doesNotContain(authorityFromFatherPermissionLinked);
    }

    @Test
    void mustVerifyIfAllTheSiblingsOfRootPermissionAreLinkedAndReturnFalse() {
        linkAllTheFatherPermissionsToGroup();

        assertThat(linkPermissionToGroupService.areAllTheSiblingsLinked(group, rootPermission)).isFalse();
    }

    @Test
    void mustVerifyIfAllTheSiblingsAreLinkedAndReturnTrue() {
        linkAllTheFatherPermissionsToGroup();
        final var permissionToMakeLink = insertDetachedPermissionChildOfRootPermission();

        assertThat(linkPermissionToGroupService.areAllTheSiblingsLinked(group, permissionToMakeLink)).isTrue();
    }

    @Test
    void mustVerifyIfAllTheSiblingsAreLinkedAndReturnFalse() {
        linkAllTheFatherPermissionsToGroup();
        final var permissionToMakeLink = insertDetachedPermissionChildOfRootPermission();
        permissionRepository.save(permissionToMakeLink);
        final var sevenChildPermission = new PermissionBuilder().upperPermission(rootPermission).build();
        permissionRepository.save(sevenChildPermission);

        assertThat(linkPermissionToGroupService.areAllTheSiblingsLinked(group, permissionToMakeLink))
                .isFalse();
    }

    private void linkAllTheFatherPermissionsToGroup() { // TODO verificar
        for (int i = 0; i < 5; i++) { // linking from all first level
            final var permissionToLink = permissionRepository.findByAuthority("1." + i).orElseThrow();
            final var groupPermission = new GroupPermission(permissionToLink, group);
            groupPermissionRepository.save(groupPermission);
        }
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < 5; j++) { // linking all from second level
                final var permissionToLink = permissionRepository.findByAuthority("1." + i + "." + j).orElseThrow();
                final var groupPermission = new GroupPermission(permissionToLink, group);
                groupPermissionRepository.save(groupPermission);
            }
        }
        // Verify if the father is linked with more than 1 permission
        assertThat(groupPermissionRepository.findByGroupId(group.getId(), null).getSize() > 1).isTrue();
    }

    /**
     * Insere uma permissão avulsa, destacada da arvore principal, mas filha da permissão root.
     *
     * @return {@link Permission}
     */
    private Permission insertDetachedPermissionChildOfRootPermission() {
        // Save unlinked permission
        final var unmarkedPermission = new PermissionBuilder()
                .upperPermission(rootPermission)
                .build();
        return permissionRepository.save(unmarkedPermission);
    }

    private void insertTreeOfPermissions() {
        rootPermission = new PermissionBuilder().authority("1").build();
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
