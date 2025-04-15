package com.emanuelvictor.accessmanager.domain.repositories;

import com.emanuelvictor.SpringBootTests;
import com.emanuelvictor.accessmanager.domain.entities.GroupPermission;
import com.emanuelvictor.accessmanager.domain.entities.Permission;
import com.emanuelvictor.accessmanager.domain.entity.AccessGroupPermissionBuilder;
import com.emanuelvictor.accessmanager.domain.entity.GroupBuilder;
import com.emanuelvictor.accessmanager.domain.entity.PermissionBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;

import java.util.Arrays;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;


public class GroupPermissionRepositoryTests extends SpringBootTests {

    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private PermissionRepository permissionRepository;
    @Autowired
    private GroupPermissionRepository groupPermissionRepository;

    private Permission rootPermission;

    @BeforeEach
    void setUp() {
        rootPermission = new PermissionBuilder().authority("root").name("Root").build();
        permissionRepository.save(rootPermission);
    }

    @Test
    public void mustSaveGroupPermission() {
        final var group = new GroupBuilder().name("Access Group Name").build();
        groupRepository.save(group);
        var groupPermissionToSave = new AccessGroupPermissionBuilder()
                .permission(rootPermission)
                .group(group)
                .build();

        final GroupPermission groupPermissionSaved = groupPermissionRepository.save(groupPermissionToSave);

        assertThat(groupPermissionSaved).isEqualTo(groupPermissionToSave);
    }

    @Test
    public void saveTwoGroupPermissionsAndMustReturnOnlyGroupPermissionsFromFistGroup() {
        var groupOne = new GroupBuilder().name("groupOne").build();
        var groupTwo = new GroupBuilder().name("groupTwo").build();
        groupRepository.saveAll(Arrays.asList(groupOne, groupTwo));
        var permissionOne = new PermissionBuilder()
                .upperPermission(rootPermission)
                .name("permissionOne")
                .authority("authorityPermissionOne")
                .build();
        var permissionTwo = new PermissionBuilder()
                .upperPermission(rootPermission)
                .name("permissionTwo")
                .authority("authorityPermissionTwo")
                .build();
        permissionRepository.saveAll(Arrays.asList(permissionOne, permissionTwo));
        var groupPermissionToGroupOne = new AccessGroupPermissionBuilder()
                .permission(permissionOne)
                .group(groupOne)
                .build();
        var groupPermissionToGroupTwo = new AccessGroupPermissionBuilder()
                .permission(permissionTwo)
                .group(groupTwo)
                .build();
        groupPermissionRepository.saveAll(Arrays.asList(groupPermissionToGroupOne, groupPermissionToGroupTwo));

        var groupPermissions = groupPermissionRepository.listByFilters(groupOne.getId(), null, Pageable.unpaged());

        assertThat(groupPermissions).extracting(GroupPermission::getGroup).containsExactly(groupOne);
    }

    @Test
    public void saveTwoGroupPermissionsAndMustReturnOnlyGroupPermissionsSecondFistGroup() {
        var groupOne = new GroupBuilder().name("groupOne").build();
        var groupTwo = new GroupBuilder().name("groupTwo").build();
        groupRepository.saveAll(Arrays.asList(groupOne, groupTwo));
        var permissionOne = new PermissionBuilder()
                .upperPermission(rootPermission)
                .name("permissionOne")
                .authority("authorityPermissionOne")
                .build();
        var permissionTwo = new PermissionBuilder()
                .upperPermission(rootPermission)
                .name("permissionTwo")
                .authority("authorityPermissionTwo")
                .build();
        permissionRepository.saveAll(Arrays.asList(permissionOne, permissionTwo));
        var groupPermissionToGroupOne = new AccessGroupPermissionBuilder()
                .permission(permissionOne)
                .group(groupOne)
                .build();
        var groupPermissionToGroupTwo = new AccessGroupPermissionBuilder()
                .permission(permissionTwo)
                .group(groupTwo)
                .build();
        groupPermissionRepository.saveAll(Arrays.asList(groupPermissionToGroupOne, groupPermissionToGroupTwo));

        var groupPermissions = groupPermissionRepository.listByFilters(groupTwo.getId(), null, Pageable.unpaged());

        assertThat(groupPermissions).extracting(GroupPermission::getGroup).containsExactly(groupTwo);
    }

    @ParameterizedTest
    @MethodSource("getLeafPermissions")
    public void mustFindAGroupLinkedToSomeRootOrLeafFromPermission(final String rootPermission,
                                                                   final Set<String> leafPermissions,
                                                                   final int countOfLinkedPermissionsExpected) {
        insertTreeOfPermissions();
        var accessGroupToBeLinkedToLeafPermission = new GroupBuilder().build();
        groupRepository.save(accessGroupToBeLinkedToLeafPermission);
        leafPermissions.forEach(leafPermission -> {
            var permission = permissionRepository.findByAuthority(leafPermission).orElseThrow();
            var groupPermissionToGroupOne = new AccessGroupPermissionBuilder().permission(permission)
                    .group(accessGroupToBeLinkedToLeafPermission).build();
            groupPermissionRepository.save(groupPermissionToGroupOne);
        });

        final int hasSomeAccessGroupLinkedToChildPermission =
                groupPermissionRepository.verifyIfThePermissionHasSomeChildLinkedToGroup(accessGroupToBeLinkedToLeafPermission.getId(), rootPermission);

        assertThat(hasSomeAccessGroupLinkedToChildPermission).isEqualTo(countOfLinkedPermissionsExpected);
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

    public static Stream<Arguments> getLeafPermissions() {
        return Stream.of(
                Arguments.arguments("1", Collections.singleton("1"), 0),
                Arguments.arguments("1", Collections.singleton("1.0"), 1),
                Arguments.arguments("1", Set.of("1.0", "1.1"), 2),
                Arguments.arguments("1", Collections.singleton("1.0.0"), 1),
                Arguments.arguments("1", Set.of("1.0.0", "1.0.1", "1.1.0", "1.1.1"), 4),
                Arguments.arguments("1.0", Collections.singleton("1.0"), 0),
                Arguments.arguments("1.0", Collections.singleton("1.0.0"), 1),
                Arguments.arguments("1.1", Collections.singleton("1.0.0"), 0)
        );
    }

}
