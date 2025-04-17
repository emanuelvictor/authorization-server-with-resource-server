package com.emanuelvictor.accessmanager.domain.entities;

import com.emanuelvictor.common.domain.entities.PersistentEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import static com.emanuelvictor.Main.DEFAULT_TENANT_ID;


/**
 * @author Emanuel Victor
 * @version 1.0.0
 * @since 1.0.0, 10/09/2019
 */
@Setter
@Getter
@Entity
@NoArgsConstructor
@Table(schema = DEFAULT_TENANT_ID)
@EqualsAndHashCode(callSuper = true)
public class Group extends PersistentEntity {

    @NotBlank
    @Length(max = 50)
    @Column(nullable = false, unique = true, length = 50)
    private String name;

    public Group(Long id, String name) {
        super(id);
        this.name = name;
    }

}
