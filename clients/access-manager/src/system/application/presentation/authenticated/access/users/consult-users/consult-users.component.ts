import {DialogService} from '../../../../../../domain/services/dialog.service';
import {MessageService} from '../../../../../../domain/services/message.service';
import {PaginationService} from '../../../../../../domain/services/pagination.service';
import {handlePageable} from '../../../../../utils/handle-data-table';
import {UserRepository} from "../../../../../../domain/repository/user.repository";
import {ListPageComponent} from 'system/application/controls/crud/list/list-page.component';
import {User} from 'system/domain/entity/user.model';
import {Component, OnInit, ViewChild} from "@angular/core";
import {MatTableDataSource} from "@angular/material";

// @ts-ignore
@Component({
  selector: 'consultar-users',
  templateUrl: './consult-users.component.html',
  styleUrls: ['../user.component.scss']
})
export class ConsultUsersComponent implements OnInit {

  @ViewChild(ListPageComponent, {static: true})
  private user: User = new User();

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
    {name: 'name', label: 'Nome'},
    {name: 'username', label: "Nome de Usuário"},
    {name: 'enabled', label: 'Ativo', translate: true},
  ];

  public displayedColumns: string[] = this.columns.map(cell => cell.name);

  public dataSource = new MatTableDataSource();

  /**
   * @param dialogService {DialogService}
   * @param paginationService {PaginationService}
   * @param messageService {MessageService}
   * @param userRepository {UserRepository}
   */
  constructor(private dialogService: DialogService,
              paginationService: PaginationService,
              private messageService: MessageService,
              private userRepository: UserRepository) {

    this.displayedColumns.push('acoes');
    this.pageable = paginationService.pageable('name');

  }

  /**
   *
   */
  ngOnInit() {
    // Seta o size do pageable no size do paginator
    (this.user as any).paginator.pageSize = this.pageable.size;

    // Sobrescreve o sortChange do sort bindado
    this.sortChange();
  }

  /**
   *
   */
  public sortChange() {
    (this.user as any).sort.sortChange.subscribe(() => {
      const {active, direction} = (this.user as any).sort;
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

    const pageable = handlePageable(hasAnyFilter, (this.user as any).paginator, this.pageable);
    pageable.enableFilter = (this.user as any).filters.enableFilter;
    pageable.defaultFilter = (this.user as any).filters.defaultFilter;
    this.userRepository.listByFilters(pageable)
      .subscribe(result => {
        this.dataSource = new MatTableDataSource(result.content);
        this.totalElements = result.totalElements;
        this.pageSize = result.size;
        this.pageIndex = result.pageable.pageNumber;
      });
  }

  /**
   * Função para confirmar a exclusão de um registro permanentemente
   * @param user
   */
  public openDeleteDialog(user) {

    this.dialogService.confirmDelete(user, 'USUÁRIO')
      .then((accept: boolean) => {

        if (accept) {
          this.userRepository.delete(user.id)
            .then(() => {
              this.listByFilters();
              this.messageService.toastSuccess('Usuário excluído com sucesso')
            });
        }
      });
  }
}

