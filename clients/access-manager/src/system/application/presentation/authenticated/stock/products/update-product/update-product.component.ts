import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticatedViewComponent} from '../../../authenticated-view.component';
import {MessageService} from '../../../../../../domain/services/message.service';
import {ProductRepository} from "../../../../../../domain/repository/product.repository";
import {Product} from "../../../../../../domain/entity/product.model";

// @ts-ignore
@Component({
  selector: 'update-product',
  templateUrl: 'update-product.component.html',
  styleUrls: ['../products.component.scss']
})
export class UpdateProductComponent implements OnInit {


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
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private homeView: AuthenticatedViewComponent,
              private productRepository: ProductRepository) {
    homeView.toolbar.subhead = 'Produto / Editar';
  }

  /**
   *
   */
  back() {
    if (this.activatedRoute.snapshot.routeConfig.path === 'edit/:id')
      this.router.navigate(['access/products']);
    else
      this.router.navigate(['access/products/' + (+this.activatedRoute.snapshot.params.id)]);
  }

  /**
   *
   */
  ngOnInit() {
    this.findById();
  }

  /**
   *
   */
  public findById() {
    this.productRepository.findById(+this.activatedRoute.snapshot.params.id)
      .subscribe((result) =>
        this.product = result
      );
  }

  /**
   *
   * @param form
   */
  public save(form) {

    if (form.invalid) {
      this.messageService.toastWarning();
      return;
    }

    this.productRepository.save(this.product)
      .then(() => {
        this.router.navigate(['access/products']);
        this.messageService.toastSuccess();
      });
  }

}
