package com.emanuelvictor.accessmanager.application.services;

import com.emanuelvictor.accessmanager.domain.entities.Application;
import com.emanuelvictor.accessmanager.domain.entities.Permission;
import com.emanuelvictor.accessmanager.domain.logics.application.ApplicationSavingLogic;
import com.emanuelvictor.accessmanager.domain.logics.application.ApplicationUpdatingLogic;
import com.emanuelvictor.accessmanager.domain.repositories.ApplicationRepository;
import com.emanuelvictor.accessmanager.domain.repositories.PermissionRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

/**
 *  TODO maybe conver to Application Service
 * @author Emanuel Victor
 * @version 1.0.0
 * @since 2.0.0, 04/01/2020
 */
@Component
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ApplicationService {

    public static final Logger LOG = LoggerFactory.getLogger(ApplicationService.class);

    private final PasswordEncoder passwordEncoder;

    private final PermissionRepository permissionRepository;
    private final ApplicationRepository applicationRepository;

    private final List<ApplicationSavingLogic> applicationSavingLogics;
    private final List<ApplicationUpdatingLogic> userUpdatingLogics;

    /**
     * @param defaultFilter String
     * @param enableFilter  Boolean
     * @param pageable      Pageable
     * @return Page<Application>
     */
    public Page<Application> listByFilters(final String defaultFilter, final Boolean enableFilter, final Pageable pageable) {
        return applicationRepository.listByFilters(defaultFilter, pageable);
    }

    /**
     * @param application Usuario
     */
    @Transactional
    public Application save(final Application application) {

        Assert.isNull(application.getId(), "Você não tem acesso a essa aplicação");

        this.applicationSavingLogics.forEach(logic -> logic.perform(application));

        return this.applicationRepository.save(application);
    }

    /**
     * @param application Usuario
     */
    @Transactional
    public Application save(final long id, final Application application) {

        this.applicationRepository.findById(id).ifPresentOrElse(actual -> {
            this.userUpdatingLogics.forEach(logic -> logic.perform(application));

            this.applicationRepository.save(application);
        }, () -> {
            throw new IllegalArgumentException("O id não pode ser nulo para atualização");
        });

        return application;

    }

    /**
     * @param id long
     */
    @Transactional
    public void delete(final long id) {
        this.applicationRepository.findById(id).ifPresent(application -> {
            if (application.getClientId().equals("admin")) {
                throw new IllegalArgumentException("Impossivel deletar o Administrador");
            } else {
                this.applicationRepository.delete(application);
            }
        });
    }

    /**
     * @param clientId String
     * @return {@link Optional<Application>}
     */
    public Optional<Application> loadClientByClientId(final String clientId) {
        return applicationRepository.findByClientId(clientId);
    }

    /**
     * @return List<Aplicacao>
     */
    public List<Application> findAll() {
        return applicationRepository.findAll();
    }

    /**
     * @param filters   String
     * @param pageable Pageable
     * @return Page<Aplicaca
     */
    public Page<Application> listByFilters(final String filters, final Pageable pageable) {
        return applicationRepository.listByFilters(filters, pageable);
    }

    /**
     * @param id Long
     * @return Optional<Aplicacao>
     */
    public Optional<Application> findById(final long id) {
        return this.applicationRepository.findById(id);
    }

    /**
     * @return Page<Permissao>
     */
    public Page<Permission> findAllPermissions() {
        return permissionRepository.findAll(PageRequest.of(0, 100000));
    }

    /**
     * @param clientId String
     */
    public Boolean notify(final String clientId) {
        LOG.info("Notifying " + clientId);
        return true;
    }
}
