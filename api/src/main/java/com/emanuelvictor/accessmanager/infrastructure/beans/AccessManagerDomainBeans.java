package com.emanuelvictor.accessmanager.infrastructure.beans;

import com.emanuelvictor.accessmanager.application.ports.secundaries.jpa.GroupPermissionRepository;
import com.emanuelvictor.accessmanager.application.ports.secundaries.jpa.GroupRepository;
import com.emanuelvictor.accessmanager.application.ports.secundaries.jpa.PermissionRepository;
import com.emanuelvictor.accessmanager.domain.services.LinkPermissionToGroupService;
import com.emanuelvictor.accessmanager.domain.services.UnlinkPermissionToGroupService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AccessManagerDomainBeans {

    @Bean
    LinkPermissionToGroupService linkPermissionToGroupService(final GroupRepository groupRepository,
                                                              final PermissionRepository permissionRepository,
                                                              final GroupPermissionRepository groupPermissionRepository) {
        return new LinkPermissionToGroupService(groupRepository, permissionRepository, groupPermissionRepository);
    }

    @Bean
    UnlinkPermissionToGroupService unlinkPermissionToGroupService(final PermissionRepository permissionRepository,
                                                                  final GroupPermissionRepository groupPermissionRepository,
                                                                  final LinkPermissionToGroupService linkPermissionToGroupService) {
        return new UnlinkPermissionToGroupService(permissionRepository, groupPermissionRepository, linkPermissionToGroupService);
    }
}
