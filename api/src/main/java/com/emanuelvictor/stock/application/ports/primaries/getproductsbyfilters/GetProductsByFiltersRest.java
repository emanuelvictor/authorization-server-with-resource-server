package com.emanuelvictor.stock.application.ports.primaries.getproductsbyfilters;

import com.emanuelvictor.stock.application.ports.secundaries.jpa.ProductJPARepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/stocks/products")
public class GetProductsByFiltersRest {

    private final ProductJPARepository productJPARepository;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('root.stocks.products.read','root.stocks.products','root.stocks.products','root.stocks','root')")
    public Page<ProductDTO> getAllProducts(final String filters, Pageable pageable) {
        final var page = productJPARepository.listProductsByFilters(filters, pageable);
        return new PageImpl<>(page.stream().map(product -> new ProductDTO(product.getName())).toList(), pageable, page.getTotalElements());
    }
}
