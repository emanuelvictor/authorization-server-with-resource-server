import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticatedViewComponent} from '../../../authenticated-view.component';
import {MessageService} from '../../../../../../domain/services/message.service';
import {Product} from "../../../../../../domain/entity/product.model";
import {ProductRepository} from "../../../../../../domain/repository/product.repository";

// @ts-ignore
@Component({
  selector: 'insert-products',
  templateUrl: 'insert-product.component.html',
  styleUrls: ['../products.component.scss']
})
export class InsertProductComponent {

  /**
   *
   */
  product: Product = new Product();

  /**
   *
   * @param router
   * @param homeView
   * @param activatedRoute
   * @param messageService
   * @param productRepository
   */
  constructor(private router: Router,
              private messageService: MessageService,
              private homeView: AuthenticatedViewComponent,
              private productRepository: ProductRepository) {
    homeView.toolbar.subhead = 'Produtos / Adicionar';
  }

  public save(form) {

    if (form.invalid) {
      this.messageService.toastWarning();
      return;
    }

    this.productRepository.save(this.product)
      .then(() => {
        this.router.navigate(['stocks/products']);
        this.messageService.toastSuccess();
      });
  }

}
