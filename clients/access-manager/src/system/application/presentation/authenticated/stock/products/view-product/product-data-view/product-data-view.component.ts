import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthenticatedViewComponent} from '../../../../authenticated-view.component';
import {Product} from "../../../../../../../domain/entity/product.model";
import {PermissionRepository} from "../../../../../../../domain/repository/permission.repository";
import {Permission} from "../../../../../../../domain/entity/permission.model";

// @ts-ignore
@Component({
  selector: 'access-product-data-view',
  templateUrl: 'product-data-view.component.html',
  styleUrls: ['../../products.component.scss']
})
export class ProductDataViewComponent implements OnInit {

  @Input()
  product: Product;

  constructor(homeView: AuthenticatedViewComponent,
              public activatedRoute: ActivatedRoute) {
    homeView.toolbar.subhead = 'Produto / Detalhes';
  }

  async ngOnInit() {
  }
}
