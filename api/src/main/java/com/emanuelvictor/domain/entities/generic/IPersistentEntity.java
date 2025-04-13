package com.emanuelvictor.domain.entities.generic;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;

/**
 * @author Emanuel Victor
 * @version 1.0.0
 * @since 2.0.0, 01/01/2020
 */
public interface IPersistentEntity<T extends Serializable> extends Serializable {

    /**
     * @return
     */
    T getId();

    /**
     * @return
     */
    @JsonIgnore
    // TODO acoplamento
    boolean isSaved();

    /**
     * @return
     */
    @JsonIgnore // TODO acoplamento
    default boolean isNotSaved() {
        return !this.isSaved();
    }
}
