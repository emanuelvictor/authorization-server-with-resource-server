package com.emanuelvictor.stock.application.ports.primaries.getproductsbyfilters;

import com.emanuelvictor.stock.application.ports.secundaries.jpa.ProductJPARepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class GetProductsByFiltersRest {

    private final ProductJPARepository productJPARepository; // TODO deve chamar o domain mesmo

    @GetMapping("api/products")
    @Transactional(readOnly = true)
    @PreAuthorize("hasAnyAuthority('root.access-manager.groups.read','root.access-manager.groups','root.access-manager','root')")
    public Page<ProductDTO> getAllProducts(final String filters, Pageable pageable) {
        final var page = productJPARepository.listProductsByFilters(filters, pageable);
        return new PageImpl<>(page.stream().map(product -> new ProductDTO(product.getName())).toList(), pageable, page.getTotalElements());
    }
}
