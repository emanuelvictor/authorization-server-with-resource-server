package com.emanuelvictor.accessmanager.domain.logics;


import com.emanuelvictor.accessmanager.domain.entities.generic.PersistentEntity;

/**
 * @author Emanuel Victor
 * @version 1.0.0
 * @since 2.0.0, 07/01/2020
 */
public interface BusinessLogic<T extends PersistentEntity> {

    /**
     * @param value
     */
    void perform(T value);
}
