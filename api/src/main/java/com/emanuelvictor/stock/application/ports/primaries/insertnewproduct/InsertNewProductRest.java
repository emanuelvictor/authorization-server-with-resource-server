package com.emanuelvictor.stock.application.ports.primaries.insertnewproduct;

import com.emanuelvictor.stock.domain.Product;
import com.emanuelvictor.stock.domain.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequiredArgsConstructor
public class InsertNewProductRest {

    private final ProductRepository productRepository;

    @Transactional
    @PostMapping("api/products")
    public ResponseEntity<ProductDTO> insertNewProduct(@RequestBody ProductDTO productDTO) {
        final var product = Product.createNewProduct(productDTO.name());
        productRepository.addProduct(product);
        return new ResponseEntity<>(productDTO, CREATED);
    }
}
