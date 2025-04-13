import {DialogService} from '../../../../../../domain/services/dialog.service';
import {MessageService} from '../../../../../../domain/services/message.service';
import {PaginationService} from '../../../../../../domain/services/pagination.service';
import {handlePageable} from '../../../../../utils/handle-data-table';
import {ApplicationRepository} from "../../../../../../domain/repository/application.repository";
import {ListPageComponent} from 'system/application/controls/crud/list/list-page.component';
import {Application} from 'system/domain/entity/application.model';
import {Component, OnInit, ViewChild} from "@angular/core";
import {MatTableDataSource} from "@angular/material";

// @ts-ignore
@Component({
  selector: 'consultar-applications',
  templateUrl: './consult-applications.component.html',
  styleUrls: ['../application.component.scss']
})
export class ConsultApplicationsComponent implements OnInit {

  @ViewChild(ListPageComponent, {static: true})
  private application: Application = new Application();

  public filters: any = {defaultFilter: '', enableFilter: 'true'}; // Estado inicial dos filtros

  public pageable: any = {
    size: 20,
    page: 0,
    sort: null,
    defaultFilter: [],
    enableFilter: true
  };

  public totalElements: any;
  public pageIndex: any;
  public pageSize: any;

  public columns: any[] = [
    {name: 'clientId', label: "Nome do Aplicativo"}
  ];

  public displayedColumns: string[] = this.columns.map(cell => cell.name);

  public dataSource = new MatTableDataSource();

  /**
   * @param dialogService {DialogService}
   * @param paginationService {PaginationService}
   * @param messageService {MessageService}
   * @param applicationRepository {ApplicationRepository}
   */
  constructor(private dialogService: DialogService,
              paginationService: PaginationService,
              private messageService: MessageService,
              private applicationRepository: ApplicationRepository) {

    this.displayedColumns.push('acoes');
    this.pageable = paginationService.pageable('clientId');

  }

  /**
   *
   */
  ngOnInit() {
    // Seta o size do pageable no size do paginator
    (this.application as any).paginator.pageSize = this.pageable.size;

    // Sobrescreve o sortChange do sort bindado
    this.sortChange();
  }

  /**
   *
   */
  public sortChange() {
    (this.application as any).sort.sortChange.subscribe(() => {
      const {active, direction} = (this.application as any).sort;
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

    const pageable = handlePageable(hasAnyFilter, (this.application as any).paginator, this.pageable);
    pageable.enableFilter = (this.application as any).filters.enableFilter;
    pageable.defaultFilter = (this.application as any).filters.defaultFilter;
    this.applicationRepository.listByFilters(pageable)
      .subscribe(result => {
        this.dataSource = new MatTableDataSource(result.content);
        this.totalElements = result.totalElements;
        this.pageSize = result.size;
        this.pageIndex = result.pageable.pageNumber;
      });
  }

  /**
   * Função para confirmar a exclusão de um registro permanentemente
   * @param application
   */
  public openDeleteDialog(application) {

    this.dialogService.confirmDelete(application, 'USUÁRIO')
      .then((accept: boolean) => {

        if (accept) {
          this.applicationRepository.delete(application.id)
            .then(() => {
              this.listByFilters();
              this.messageService.toastSuccess('Usuário excluído com sucesso')
            });
        }
      });
  }
}

