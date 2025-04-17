package com.emanuelvictor.accessmanager.domain.entities;

import com.emanuelvictor.common.application.ports.secundaries.jpa.PersistentEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import static com.emanuelvictor.Main.DEFAULT_TENANT_ID;

/**
 * @author Emanuel Victor
 * @version 1.0.0
 * @since 1.0.0, 10/09/2019
 */
@Data
@Entity
@Table(schema = DEFAULT_TENANT_ID)
@lombok.EqualsAndHashCode(callSuper = true)
public class Tenant extends PersistentEntity {

    @NotBlank
    @Length(max = 150)
    @Column(nullable = false, unique = true, length = 150, updatable = false)
    private String identification;

    @Override
    public void beforeInsert() {
        super.beforeInsert();
        this.identification = this.identification.replaceAll(" ", "_").trim();
    }

    @Override
    public void beforeUpdate() {
        super.beforeUpdate();
        this.identification = this.identification.replaceAll(" ", "_").trim();
    }
}