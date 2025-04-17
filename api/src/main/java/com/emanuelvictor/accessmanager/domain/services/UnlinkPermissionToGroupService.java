package com.emanuelvictor.accessmanager.domain.services;

import com.emanuelvictor.accessmanager.domain.entities.Permission;
import com.emanuelvictor.accessmanager.application.ports.secundaries.jpa.GroupPermissionRepository;
import com.emanuelvictor.accessmanager.application.ports.secundaries.jpa.PermissionRepository;

/**
 * @author Emanuel Victor
 * @version 1.0.0
 * @since 1.0.0, 09/09/2022
 * <p>
 * This service contains the algorithms to unlink a Permission from AccessGroup.
 * The service with the link algorithms is {@link LinkPermissionToGroupService}
 */
public class UnlinkPermissionToGroupService {

    private final PermissionRepository permissionRepository;
    private final GroupPermissionRepository accessGroupPermissionRepository;
    private final LinkPermissionToGroupService linkPermissionToGroupService;

    public UnlinkPermissionToGroupService(PermissionRepository permissionRepository,
                                          GroupPermissionRepository groupPermissionRepository, LinkPermissionToGroupService linkPermissionToGroupService) {
        this.permissionRepository = permissionRepository;
        this.accessGroupPermissionRepository = groupPermissionRepository;
        this.linkPermissionToGroupService = linkPermissionToGroupService;
    }

    public void unlinkPermissionToGroup(final long groupId, final String authority) {
        accessGroupPermissionRepository.findByGroupIdAndPermissionAuthority(groupId, authority)
                .ifPresentOrElse(groupPermission -> accessGroupPermissionRepository.deleteByGroupIdAndPermissionAuthority(groupId, authority),
                        () -> {
                            // não encontrei?
                            // marco os irmãos
                            // subo para o nível de cima,
                            // ainda não encontrei?
                            // marco os irmãos
                            // subo para o de cima
                            // Encontrei?
                            // Desmarco este (ifPresentOrElse(groupPermission -> unlinkLowerPermis ;.... tra lá lá, primeira condicional)
                            final Permission permission = permissionRepository.findByAuthority(authority).orElseThrow();
                            permissionRepository.findByUpperPermissionId(permission.getUpperPermission().getId(), null) // todo criar uma query que retorne apenas os irmãos diretamente
                                    .forEach(siblingPermission -> {
                                        if (!siblingPermission.getAuthority().equals(permission.getAuthority())) {
                                            linkPermissionToGroupService.link(groupId, siblingPermission.getAuthority()); // TODO verify if it's can be only linkPermissionToGroupService.link
                                        }
                                    });
                            unlinkPermissionToGroup(groupId, permission.getUpperPermission().getAuthority());
                        });
    }
}
