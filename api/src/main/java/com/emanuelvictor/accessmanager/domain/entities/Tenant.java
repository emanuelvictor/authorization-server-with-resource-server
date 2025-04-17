package com.emanuelvictor.accessmanager.domain.entities;

import com.emanuelvictor.common.domain.entities.PersistentEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Pattern.Flag;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Set;

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

    /**
     *
     */
    @NotBlank
    @Length(max = 150)
    @Column(nullable = false, unique = true, length = 150, updatable = false)
    private String identification;

    /**
     *
     */
    @Override
    public void beforeInsert() {
        super.beforeInsert();
        this.identification = this.identification.replaceAll(" ", "_");
    }

}