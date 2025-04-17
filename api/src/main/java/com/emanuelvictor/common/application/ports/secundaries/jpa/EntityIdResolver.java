package com.emanuelvictor.common.application.ports.secundaries.jpa;

import com.fasterxml.jackson.annotation.ObjectIdGenerator;
import com.fasterxml.jackson.annotation.ObjectIdResolver;

import jakarta.persistence.EntityManager;

/**
 * @author Emanuel Victor
 * @version 1.0.0
 * @since 1.0.0, 10/09/2019
 */
public class EntityIdResolver implements ObjectIdResolver {

    /**
     *
     */
    private final EntityManager entityManager;

    /**
     * @param entityManager {@link EntityManager}
     */
    public EntityIdResolver(final EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    /**
     * @param id   ObjectIdGenerator.IdKey
     * @param pojo Object
     */
    @Override
    public void bindItem(final ObjectIdGenerator.IdKey id, final Object pojo) {
    }

    /**
     * @param id ObjectIdGenerator.IdKey
     * @return Object
     */
    @Override
    public Object resolveId(final ObjectIdGenerator.IdKey id) {
        return this.entityManager.find(id.scope, id.key);
    }

    /**
     * @param context Object
     * @return ObjectIdResolver
     */
    @Override
    public ObjectIdResolver newForDeserialization(final Object context) {
        return this;
    }

    /**
     * @param resolverType ObjectIdResolver
     * @return boolean
     */
    @Override
    public boolean canUseFor(final ObjectIdResolver resolverType) {
        return false;
    }
}
