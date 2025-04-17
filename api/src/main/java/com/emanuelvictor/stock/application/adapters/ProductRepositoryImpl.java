package com.emanuelvictor.stock.application.adapters;

import com.emanuelvictor.stock.application.ports.secundaries.jpa.ProductJPA;
import com.emanuelvictor.stock.application.ports.secundaries.jpa.ProductJPARepository;
import com.emanuelvictor.stock.domain.Product;
import com.emanuelvictor.stock.domain.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class ProductRepositoryImpl implements ProductRepository {

    private final ProductJPARepository ProductJPARepository;

    @Override
    public void addProduct(Product product) {
        ProductJPARepository.save(new ProductJPA(product.getName()));
    }

}
