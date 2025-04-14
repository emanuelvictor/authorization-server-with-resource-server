package com.emanuelvictor.accessmanager.domain.repositories;

import com.emanuelvictor.AbstractIntegrationTests;
import com.emanuelvictor.accessmanager.domain.entity.PermissionBuilder;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

public class PermissionRepositoryTests extends AbstractIntegrationTests {

    @Autowired
    private PermissionRepository permissionRepository;

    @Test
    public void mustFindPermissionById() {
        final var permission = new PermissionBuilder()
                .authority(UUID.randomUUID().toString())
                .name(UUID.randomUUID().toString())
                .description(UUID.randomUUID().toString())
                .build();

        final var permissionSaved = permissionRepository.save(permission);

        Assertions.assertThat(permissionSaved).isEqualTo(permission);
    }

}
