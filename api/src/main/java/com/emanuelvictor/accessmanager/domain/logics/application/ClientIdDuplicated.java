package com.emanuelvictor.accessmanager.domain.logics.application;

import com.emanuelvictor.accessmanager.domain.entities.Application;
import com.emanuelvictor.accessmanager.domain.repositories.ApplicationRepository;

// TODO create test
/**
 * @author Emanuel Victor
 * @version 1.0.0
 * @since 2.0.0, 04/01/2020
 */
public class ClientIdDuplicated implements ApplicationSavingLogic, ApplicationUpdatingLogic {

    private final ApplicationRepository applicationRepository;

    public ClientIdDuplicated(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    /**
     * @param application {@link Application}
     */
    @Override
    public void perform(Application application) {
        this.applicationRepository.findByClientId(application.getClientId())
                .ifPresent(this::duplicatedException);
    }

    /**
     * @param application {@link Application}
     */
    private void duplicatedException(final Application application) {
        throw new RuntimeException("Nome (clientId) " + application.getClientId() + "já utilizado!");
    }
}
