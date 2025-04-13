import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CrudViewComponent} from '../../crud-view.component';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
  MatMenuTrigger,
  MatPaginator,
  MatSort
} from '@angular/material';
import {tdCollapseAnimation} from '@covalent/core';
import {debounce} from 'system/application/utils/debounce';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

// @ts-ignore
@Component({
  selector: 'sistema-list-table',
  templateUrl: './list-table.component.html',
  animations: [tdCollapseAnimation],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    }
  ]
})
export class ListTableComponent extends CrudViewComponent implements OnInit {

  @ViewChild(MatMenuTrigger, {static:false}) trigger: MatMenuTrigger;
  @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator; // Bind com o objeto paginator
  @ViewChild(MatSort, {static:false}) sort: MatSort; // Bind com objeto sort

  public filters: any = {defaultFilter: '', ativoFilter: true}; // Estado inicial dos filtros

  public debounce = debounce;
  public listByFiltersStatement = () => this.listByFilters(true);

  @Input() editavel: boolean = true;
  @Input() anexavel: boolean = false;
  @Input() deletavel: boolean = true;

  @Input() rolesToAdd: string[] = ['root'];
  @Input() rolesToEdit: string[] = ['root'];
  @Input() rolesToDelete: string[] = ['root'];
  @Input() rolesToView: string[] = ['root'];

  // Tabela
  @Input() dataSource: any;
  @Input() columns: any;
  @Input() displayedColumns: any;
  @Input() totalElements: any;
  @Input() pageSize: any;
  @Input() pageIndex: any;

  // Emite um evento de acordo com a função passada para o mesmo
  @Output() list = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() delete = new EventEmitter();

  @Input() advancedFiltersActive: boolean;
  public advancedFilters: boolean = true;

  public status: any = [{nome: 'Sim', id: true}, {nome: 'Não', id: false}];

  /**
   *
   */
  ngOnInit() {

    this.columns = this.columns.filter(a => a.name !== 'ativo');

    this.rolesToAdd.push('root');
    this.rolesToEdit.push('root');
    this.rolesToDelete.push('root');
    this.rolesToView.push('root');

    this.handleLabelStatus();

    this.pageSize = 20;

    // Verifica e mantém o estado dos filtros
    // this.filters = getLocalStorage(this.filters, this.activatedRoute.component['name']);

    // Listagem inicial
    this.listByFilters(true);
  }

  /**
   * Restaura os filtros para o estado inicial
   */
  clearFilters = () => {
    const {defaultFilter, ativoFilter} = this.filters;

    if (defaultFilter || ativoFilter !== '') {
      this.filters = {defaultFilter: '', ativoFilter: 'true'};
      this.listByFilters();
    }
  };

  /**
   * Emite um evento para chamar a função no componente que o está invocando
   */
  listByFilters = (hasAnyFilter: boolean = false) => {

    // setLocalStorage(this.filters, this.activatedRoute.component['name']);
    this.list.emit(hasAnyFilter);
    this.paginator.pageSize = this.pageSize;

  };

  activateItem = (data) => this.activate.emit(data);
  openDeleteDialog = (data) => this.delete.emit(data);

  public toggleAdvancedFilters() {
    this.advancedFilters = !this.advancedFilters;
  }

  public existsAdvancedFilters(filters) {
    const {ativoFilter} = filters;
    return !!ativoFilter;
  }
}
