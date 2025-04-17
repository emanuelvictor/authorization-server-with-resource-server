package com.emanuelvictor.accessmanager.application.ports.primaries.rest;

import com.emanuelvictor.accessmanager.application.adapters.migration.MigrationService;
import com.emanuelvictor.accessmanager.domain.entities.Tenant;
import com.emanuelvictor.accessmanager.application.ports.secundaries.jpa.TenantRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 *
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("api/access-manager/tenants")
public class TenantRest {

    private final TenantRepository tenantRepository;
    private final MigrationService<String> migrationService;

    /**
     * @param defaultFilter String
     * @param pageable      Pageable
     * @return Page<Tenant>
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyAuthority('root.access-manager.tenants.read','root.access-manager.tenants','root.access-manager','root')")
    public Page<Tenant> listByFilters(final String defaultFilter, final Pageable pageable) {
        return tenantRepository.listByFilters(defaultFilter, pageable);
    }

    /**
     * @param id long
     * @return Optional<Tenant>
     */
    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyAuthority('root.access-manager.tenants.read','root.access-manager.tenants','root.access-manager','root')")
    public Optional<Tenant> findById(@PathVariable final long id) {
        return tenantRepository.findById(id);
    }

    /**
     * @param tenant Tenant
     * @return Tenant
     */
    @PostMapping
    @Transactional
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyAuthority('root.access-manager.tenants.create','root.access-manager.tenants','root.access-manager','root')")
    public Tenant create(@RequestBody final Tenant tenant) {
        final Tenant tenantCreated =  tenantRepository.save(tenant);
        migrationService.execute(tenantCreated.getIdentification());
        return tenant;
    }

    /**
     * @param tenant Tenant
     * @return Tenant
     */
    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyAuthority('root.access-manager.tenants.update','root.access-manager.tenants','root.access-manager','root')")
    public Tenant update(@PathVariable final long id, @RequestBody final Tenant tenant) {
        tenant.setId(id);
        return tenantRepository.save(tenant);
    }

}