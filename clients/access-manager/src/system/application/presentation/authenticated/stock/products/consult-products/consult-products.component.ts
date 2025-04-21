import {DialogService} from '../../../../../../domain/services/dialog.service';
import {MessageService} from '../../../../../../domain/services/message.service';
import {PaginationService} from '../../../../../../domain/services/pagination.service';
import {ListPageComponent} from '../../../../../controls/crud/list/list-page.component';
import {handlePageable} from "../../../../../utils/handle-data-table";
import {ProductRepository} from "../../../../../../domain/repository/product.repository";
import {Component, ViewChild} from "@angular/core";
import {MatTableDataSource} from "@angular/material";
import {Product} from "../../../../../../domain/entity/product.model";

// @ts-ignore
@Component({
  selector: 'consult-products',
  templateUrl: 'consult-products.component.html',
  styleUrls: ['../products.component.scss']
})
export class ConsultProductsComponent /*implements OnInit */ {

  // Bind com o component ListPageComponent
  @ViewChild(ListPageComponent, {static: true})
  private product: Product = new Product();

  public filters: any = {defaultFilter: ''}; // Estado inicial dos filtros

  public pageable: any = {
    size: 20,
    page: 0,
    sort: null,
    defaultFilter: []
  };

  public totalElements: any;
  public pageIndex: any;
  public pageSize: any;

  public columns: any[] = [
    {name: 'name', label: 'Nome'}
  ];

  public displayedColumns: string[] = this.columns.map(cell => cell.name);

  public dataSource = new MatTableDataSource();

  /**
   * @param dialogService {DialogService}
   * @param paginationService {PaginationService}
   * @param messageService {MessageService}
   * @param productRepository {ProductRepository}
   */
  constructor(private dialogService: DialogService,
              paginationService: PaginationService,
              private messageService: MessageService,
              private productRepository: ProductRepository) {

    this.displayedColumns.push('acoes');
    this.pageable = paginationService.pageable('name');

  }

  /**
   *
   */
  ngOnInit() {
    // Seta o size do pageable no size do paginator
    (this.product as any).paginator.pageSize = this.pageable.size;

    // Sobrescreve o sortChange do sort bindado
    this.sortChange();
  }

  /**
   *
   */
  public sortChange() {
    (this.product as any).sort.sortChange.subscribe(() => {
      const {active, direction} = (this.product as any).sort;
      this.pageable.sort = {'properties': active, 'direction': direction};
      this.listByFilters();
    });
  }

  /**
   *
   * @param hasAnyFilter Verifica se há algum filtro,
   * caso exista, então será redirecionado para a primeira página
   */
  public listByFilters(hasAnyFilter: boolean = false) {

    const pageable = handlePageable(hasAnyFilter, (this.product as any).paginator, this.pageable);
    pageable.defaultFilter = (this.product as any).filters.defaultFilter;

    this.productRepository.listByFilters(pageable)
      .subscribe(result => {
        this.dataSource = new MatTableDataSource(result.content);
        this.totalElements = result.totalElements;
        this.pageSize = result.size;
        this.pageIndex = result.pageable.pageNumber;
      });
  }

  /**
   * Função para confirmar a exclusão de um registro permanentemente
   * @param product
   */
  public openDeleteDialog(product) {

    this.dialogService.confirmDelete(product, 'GRUPO DE ACESSO')
      .then((accept: boolean) => {

        if (accept) {
          this.productRepository.delete(product.id)
            .then(() => {
              this.listByFilters();
              this.messageService.toastSuccess('Produto excluído com sucesso')
            });
        }
      });
  }
}
