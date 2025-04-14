package com.emanuelvictor.accessmanager.domain.entities.generic;

import lombok.*;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * TODO REMOVER
 * @author Emanuel Victor
 * @version 1.0.0
 * @since 2.0.0, 01/01/2020
 */
@ToString
@MappedSuperclass
@NoArgsConstructor
@EqualsAndHashCode(exclude = {"createdOn", "updatedOn"})
public abstract class PersistentEntity implements IPersistentEntity<Long> {

    @Id
    @Getter
    @Setter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, updatable = false)
    protected Long id;

    @Getter
    @Column(name = "created_on", nullable = false, updatable = false)
    protected LocalDateTime createdOn;

    @Getter
    @Column(name = "updated_on")
    protected LocalDateTime updatedOn;

    /**
     * @param id
     */
    public PersistentEntity(final Long id) {
        this.id = id;
    }

    /**
     *
     */
    @PrePersist
    protected void beforeInsert() {
        this.createdOn = LocalDateTime.now();
    }

    /**
     *
     */
    @PreUpdate
    protected void beforeUpdate() {
        this.updatedOn = LocalDateTime.now();
    }

    /**
     * {@inheritDoc }
     *
     * @return
     */
    @Override
    public boolean isSaved() {
        return this.id != null && this.id != 0;
    }
}
