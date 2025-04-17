package com.emanuelvictor.accessmanager.application.ports.primaries.rest;

import com.emanuelvictor.accessmanager.domain.entities.Permission;
import com.emanuelvictor.accessmanager.application.ports.secundaries.jpa.PermissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;


/**
 * RESTFul de Permissões
 *
 * @author Emanuel Victor
 * @version 1.0.0
 * @since 1.0.0, 10/09/2019
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("api/access-manager/permissions")
public class PermissionRest {

    /**
     *
     */
    private final PermissionRepository permissionRepository;

    /**
     * TODO este serviço é público?
     *
     * @param defaultFilter String
     * @param branch        Boolean
     * @param pageable      Pageable
     * @return Page<Permission>
     */
    @GetMapping
    public Page<Permission> listByFilters(final String defaultFilter, final Long upperPermissionId, final Boolean branch, final Pageable pageable) {
        return permissionRepository.listByFilters(defaultFilter, upperPermissionId, branch, pageable);
    }

    /**
     * @param id {@link Long}
     * @return {@link Permission}
     */
    @GetMapping("/{id}")
    public Optional<Permission> findById(@PathVariable final long id) {
        return permissionRepository.findById(id);
    }

}
