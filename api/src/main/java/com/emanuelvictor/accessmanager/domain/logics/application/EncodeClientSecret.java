package com.emanuelvictor.accessmanager.domain.logics.application;

import com.emanuelvictor.accessmanager.domain.entities.Application;
import org.springframework.security.crypto.password.PasswordEncoder;

// TODO create test

/**
 * @author Emanuel Victor
 * @version 1.0.0
 * @since 2.0.0, 04/01/2020
 */
public class EncodeClientSecret implements ApplicationSavingLogic {

    private final PasswordEncoder passwordEncoder;

    public EncodeClientSecret(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * @param application {@link Application}
     */
    @Override
    public void perform(final Application application) {
        if (application.getClientSecret() == null)
            application.setClientSecret(this.passwordEncoder.encode(Application.DEFAULT_PASSWORD));
        else
            application.setClientSecret(this.passwordEncoder.encode(application.getClientSecret()));
    }
}
