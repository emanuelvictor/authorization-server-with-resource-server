import {DialogService} from '../../../../../../domain/services/dialog.service';
import {MessageService} from '../../../../../../domain/services/message.service';
import {PaginationService} from '../../../../../../domain/services/pagination.service';
import {ListPageComponent} from '../../../../../controls/crud/list/list-page.component';
import {handlePageable} from "../../../../../utils/handle-data-table";
import {TenantRepository} from "../../../../../../domain/repository/tenant.repository";
import {Component, ViewChild} from "@angular/core";
import {MatTableDataSource} from "@angular/material";
import {Tenant} from "../../../../../../domain/entity/tenant.model";

// @ts-ignore
@Component({
  selector: 'consult-tenants',
  templateUrl: 'consult-tenants.component.html',
  styleUrls: ['../tenants.component.scss']
})
export class ConsultTenantsComponent /*implements OnInit */ {

  // Bind com o component ListPageComponent
  @ViewChild(ListPageComponent, {static : true})
  private tenant: Tenant = new Tenant();

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
    {name: 'identification', label: 'Identificação'}
  ];

  public displayedColumns: string[] = this.columns.map(cell => cell.name);

  public dataSource = new MatTableDataSource();

  /**
   * @param dialogService {DialogService}
   * @param paginationService {PaginationService}
   * @param messageService {MessageService}
   * @param tenantRepository {TenantRepository}
   */
  constructor(private dialogService: DialogService,
              paginationService: PaginationService,
              private messageService: MessageService,
              private tenantRepository: TenantRepository) {

    this.displayedColumns.push('acoes');
    this.pageable = paginationService.pageable('identification');

  }

  /**
   *
   */
  ngOnInit() {
    // Seta o size do pageable no size do paginator
    (this.tenant as any).paginator.pageSize = this.pageable.size;

    // Sobrescreve o sortChange do sort bindado
    this.sortChange();
  }

  /**
   *
   */
  public sortChange() {
    (this.tenant as any).sort.sortChange.subscribe(() => {
      const {active, direction} = (this.tenant as any).sort;
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

    const pageable = handlePageable(hasAnyFilter, (this.tenant as any).paginator, this.pageable);
    pageable.defaultFilter = (this.tenant as any).filters.defaultFilter;

    this.tenantRepository.listByFilters(pageable)
      .subscribe(result => {
        this.dataSource = new MatTableDataSource(result.content);
        this.totalElements = result.totalElements;
        this.pageSize = result.size;
        this.pageIndex = result.pageable.pageNumber;      
      });
  }

  /**
   * Função para confirmar a exclusão de um registro permanentemente
   * @param tenant
   */
  public openDeleteDialog(tenant) {

    this.dialogService.confirmDelete(tenant, 'CLIENTE')
      .then((accept: boolean) => {

        if (accept) {
          this.tenantRepository.delete(tenant.id)
            .then(() => {
              this.listByFilters();
              this.messageService.toastSuccess('Cliente excluído com sucesso')
            });
        }
      });
  }
}
