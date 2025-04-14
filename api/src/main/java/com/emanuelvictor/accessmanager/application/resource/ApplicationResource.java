package com.emanuelvictor.accessmanager.application.resource;

import com.emanuelvictor.accessmanager.application.services.ApplicationService;
import com.emanuelvictor.accessmanager.domain.entities.Application;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

/**
 *
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("api/access-manager/applications")
public class ApplicationResource {

    /**
     *
     */
    private final ApplicationService applicationService;

    /**
     * @param defaultFilter String
     * @param enableFilter  Boolean
     * @param pageable      Pageable
     * @return Page<Application>
     */
    @GetMapping
    @PreAuthorize("hasAnyAuthority('root.access-manager.applications.read','root.access-manager.applications','root.access-manager','root')")
    public Page<Application> listByFilters(final String defaultFilter, final Boolean enableFilter, final Pageable pageable) {
        return applicationService.listByFilters(defaultFilter, enableFilter, pageable);
    }

    /**
     * @param id long
     * @return Application
     */
    @GetMapping("{id}")
//    @PreAuthorize("hasAnyAuthority('root.access-manager.applications.read','root.access-manager.applications','root.access-manager','root')")
    public Optional<Application> findById(@PathVariable final Long id) {
        return applicationService.findById(id);
    }

    /**
     * @param clienteId long
     * @return Application
     */
    @GetMapping("{clienteId}/load")
//    @PreAuthorize("hasAnyAuthority('root.access-manager.applications.read','root.access-manager.applications','root.access-manager','root')")
    public Optional<Application> findById(@PathVariable final String clienteId) {
        return applicationService.loadClientByClientId(clienteId);
    }

    /**
     * @param application Application
     * @return Application
     */
    @PostMapping
    @PreAuthorize("hasAnyAuthority('root.access-manager.applications.create','root.access-manager.applications','root.access-manager','root')")
    public Application save(@RequestBody final Application application) {
        return applicationService.save(application);
    }

    /**
     * @param id          long
     * @param application Application
     * @return Application
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('root.access-manager.applications.update','root.access-manager.applications','root.access-manager','root')")
    public Application updateApplication(@PathVariable final long id, @RequestBody final Application application) {
        return applicationService.save(id, application);
    }
}
