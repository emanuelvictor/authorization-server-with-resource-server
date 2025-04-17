package com.emanuelvictor.stock.application.ports.secundaries.jpa;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Setter
@Getter
@Entity
@NoArgsConstructor
@Table(name = "product")
public class ProductJPA {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String name;

    public ProductJPA(UUID id, String name) {
        this.id = id;
        this.name = name;
    }

    public ProductJPA(String name) {
        this.name = name;
    }

}
