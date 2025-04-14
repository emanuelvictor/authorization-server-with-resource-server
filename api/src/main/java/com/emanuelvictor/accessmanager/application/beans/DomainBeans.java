package com.emanuelvictor.accessmanager.application.beans;

import com.emanuelvictor.accessmanager.domain.logics.application.ClientIdDuplicated;
import com.emanuelvictor.accessmanager.domain.logics.application.EncodeClientSecret;
import com.emanuelvictor.accessmanager.domain.repositories.ApplicationRepository;
import com.emanuelvictor.accessmanager.domain.repositories.GroupPermissionRepository;
import com.emanuelvictor.accessmanager.domain.repositories.GroupRepository;
import com.emanuelvictor.accessmanager.domain.repositories.PermissionRepository;
import com.emanuelvictor.accessmanager.domain.services.LinkPermissionToGroupService;
import com.emanuelvictor.accessmanager.domain.services.UnlinkPermissionToGroupService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DomainBeans {

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

    @Bean
    EncodeClientSecret encodeClientSecret(final PasswordEncoder passwordEncoder) {
        return new EncodeClientSecret(passwordEncoder);
    }

    @Bean
    ClientIdDuplicated clientIdDuplicated(ApplicationRepository applicationRepository) {
        return new ClientIdDuplicated(applicationRepository);
    }
}
