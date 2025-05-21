import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductRepository } from '../../../domain/repositories/product.repository';

@Component({
  selector: 'search-products',
  templateUrl: './search-products.component.html',
  styleUrl: './search-products.component.scss', standalone: false
})
export class SearchProductsComponent implements OnInit {

  pageOfProducts: any;

  constructor(private productRepository: ProductRepository) {
  }

  ngOnInit(): void {
    this.productRepository.listByFilters({}).subscribe(page => {
      this.pageOfProducts = page;
    })
  }
}
