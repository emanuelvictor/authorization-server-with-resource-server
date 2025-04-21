import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticatedViewComponent} from '../../../authenticated-view.component';
import {MessageService} from '../../../../../../domain/services/message.service';
import {ProductRepository} from "../../../../../../domain/repository/product.repository";
import {DialogService} from "../../../../../../domain/services/dialog.service";
import {Product} from "../../../../../../domain/entity/product.model";
import {PermissionRepository} from "../../../../../../domain/repository/permission.repository";
import {Permission} from "../../../../../../domain/entity/permission.model";

// @ts-ignore
@Component({
  selector: 'view-products',
  templateUrl: 'view-product.component.html',
  styleUrls: ['../products.component.scss']
})
export class ViewProductComponent implements OnInit {

  /**
   *
   */
  permissions: Permission[];

  /**
   *
   */
  product: Product = new Product();

  /**
   *
   * @param router
   * @param homeView
   * @param dialogService
   * @param activatedRoute
   * @param messageService
   * @param productRepository
   */
  constructor(private router: Router,
              private dialogService: DialogService,
              public activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private homeView: AuthenticatedViewComponent,
              private productRepository: ProductRepository) {

    this.product.id = +this.activatedRoute.snapshot.params.id || null;
    homeView.toolbar.subhead = 'Produto / Detalhes';

  }

  /**
   *
   */
  ngOnInit() {
    if (this.product && this.product.id) {
      this.findById();
    }
  }

  /**
   *
   */
  public findById() {
    this.productRepository.findById(this.product.id)
      .subscribe((result) => {
        this.product = result;
      })
  }

  /**
   * Função para confirmar a exclusão de um registro permanentemente
   * @param product
   */
  public openDeleteDialog(product: Product) {

    this.dialogService.confirmDelete(product, 'Produto')
      .then((accept: boolean) => {

        if (accept) {
          this.productRepository.delete(product.id)
            .then(() => {
              this.router.navigate(['access/products']);
              this.messageService.toastSuccess('Registro excluído com sucesso')
            })
        }
      })
  }
}
