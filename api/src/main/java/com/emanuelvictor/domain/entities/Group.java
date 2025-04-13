package com.emanuelvictor.domain.entities;

import com.emanuelvictor.domain.entities.generic.PersistentEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import java.util.List;
import java.util.Set;


/**
 * @author Emanuel Victor
 * @version 1.0.0
 * @since 1.0.0, 10/09/2019
 */
@Setter
@Getter
@Entity
@NoArgsConstructor
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
