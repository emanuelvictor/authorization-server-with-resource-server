package com.emanuelvictor.stock.domain;

import lombok.Getter;

import java.util.UUID;

@Getter
public class Product {

    private final UUID id;
    private final String name;

    private Product(UUID id, String name) {
        this.id = id;
        this.name = name;
    }

    public static Product createNewProduct(final String name){
        return  new Product(UUID.randomUUID(), name);
    }
}
