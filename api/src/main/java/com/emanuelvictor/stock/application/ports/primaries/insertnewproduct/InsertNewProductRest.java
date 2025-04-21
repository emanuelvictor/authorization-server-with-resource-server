package com.emanuelvictor.stock.application.ports.primaries.insertnewproduct;

import com.emanuelvictor.stock.domain.Product;
import com.emanuelvictor.stock.domain.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/stocks/products")
public class InsertNewProductRest {

    private final ProductRepository productRepository;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('root.stocks.products.create','root.stocks.products','root.stocks.products','root.stocks','root')")
    public ResponseEntity<ProductDTO> insertNewProduct(@RequestBody ProductDTO productDTO) {
        final var product = Product.createNewProduct(productDTO.name());
        productRepository.addProduct(product);
        return new ResponseEntity<>(productDTO, CREATED);
    }
}
