import {DialogService} from '../../../../../../domain/services/dialog.service';
import {MessageService} from '../../../../../../domain/services/message.service';
import {PaginationService} from '../../../../../../domain/services/pagination.service';
import {ListPageComponent} from '../../../../../controls/crud/list/list-page.component';
import {handlePageable} from "../../../../../utils/handle-data-table";
import {GroupRepository} from "../../../../../../domain/repository/group.repository";
import {Component, ViewChild} from "@angular/core";
import {MatTableDataSource} from "@angular/material";
import {Group} from "../../../../../../domain/entity/group.model";

// @ts-ignore
@Component({
  selector: 'consult-groups',
  templateUrl: 'consult-groups.component.html',
  styleUrls: ['../groups.component.scss']
})
export class ConsultGroupsComponent /*implements OnInit */ {

  // Bind com o component ListPageComponent
  @ViewChild(ListPageComponent, {static : true})
  private group: Group = new Group();

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
   * @param groupRepository {GroupRepository}
   */
  constructor(private dialogService: DialogService,
              paginationService: PaginationService,
              private messageService: MessageService,
              private groupRepository: GroupRepository) {

    this.displayedColumns.push('acoes');
    this.pageable = paginationService.pageable('name');

  }

  /**
   *
   */
  ngOnInit() {
    // Seta o size do pageable no size do paginator
    (this.group as any).paginator.pageSize = this.pageable.size;

    // Sobrescreve o sortChange do sort bindado
    this.sortChange();
  }

  /**
   *
   */
  public sortChange() {
    (this.group as any).sort.sortChange.subscribe(() => {
      const {active, direction} = (this.group as any).sort;
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

    const pageable = handlePageable(hasAnyFilter, (this.group as any).paginator, this.pageable);
    pageable.defaultFilter = (this.group as any).filters.defaultFilter;

    this.groupRepository.listByFilters(pageable)
      .subscribe(result => {
        this.dataSource = new MatTableDataSource(result.content);
        this.totalElements = result.totalElements;
        this.pageSize = result.size;
        this.pageIndex = result.pageable.pageNumber;      
      });
  }

  /**
   * Função para confirmar a exclusão de um registro permanentemente
   * @param group
   */
  public openDeleteDialog(group) {

    this.dialogService.confirmDelete(group, 'GRUPO DE ACESSO')
      .then((accept: boolean) => {

        if (accept) {
          this.groupRepository.delete(group.id)
            .then(() => {
              this.listByFilters();
              this.messageService.toastSuccess('Grupo de Acesso excluído com sucesso')
            });
        }
      });
  }
}
