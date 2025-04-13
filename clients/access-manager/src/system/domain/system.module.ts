import {SharedModule} from '../../shared/shared.module';
import {Interceptor} from '../application/interceptor/interceptor';
import {Describer} from '../application/describer/describer';
import {AuthenticationService} from './services/authentication.service';
import {WildcardService} from './services/wildcard.service';
import {MessageService} from './services/message.service';
import {DialogService} from './services/dialog.service';
import {LoginComponent} from '../application/presentation/login/login.component';
import {AuthenticatedViewComponent} from '../application/presentation/authenticated/authenticated-view.component';
import {DeleteDialogComponent} from '../application/controls/delete-dialog/delete-dialog.component';
import {CrudViewComponent} from '../application/controls/crud/crud-view.component';
import {ListPageComponent} from '../application/controls/crud/list/list-page.component';
import {DetailPageComponent} from '../application/controls/crud/detail/detail-page.component';
import {FormPageComponent} from '../application/controls/crud/form/form-page.component';
import {getPaginatorIntl} from './services/portuguese-paginator-intl';
import {PaginationService} from './services/pagination.service';
import {SystemRoutingModule} from "./system.routing.module";
import {EmConstrucaoComponent} from "../application/controls/not-found/em-construcao.component";
import {GroupRepository} from "./repository/group.repository";
import {UserRepository} from "./repository/user.repository";
import {PermissionRepository} from "./repository/permission.repository";
import {EvDatepicker} from "../application/controls/ev-datepicker/ev-datepicker";
import {FirstUppercasePipe} from "../application/utils/utils";
import {HasPermissionDirective} from "../application/has-permission/has-permission";
import {CnpjValidator, CpfValidator} from "../application/controls/validators/validators";
import {DocumentoPipe} from "../application/controls/documento-pipe/documento-pipe";
import {UserInitialsPipe} from "../application/controls/pipes/user-initials.pipe";
import {FormToolbarComponent} from 'system/application/controls/crud/cadastros/form-toolbar/form-toolbar.component';
import {ListTableComponent} from 'system/application/controls/crud/cadastros/list-table/list-table.component';
import {EntityFormComponent} from 'system/application/controls/crud/cadastros/entity-form/entity-form.component';
import {ButtonToggleAdvancedFiltersComponent} from 'system/application/controls/button-toggle-advanced-filters/button-toggle-advanced-filters.component';
import {ButtonClearFiltersComponent} from 'system/application/controls/button-clear-filters/button-clear-filters.component';
import {NoRecordsFoundComponent} from "system/application/controls/no-records-found/no-records-found.component";
import {FilterPipe} from "../application/controls/pipes/filter.pipe";
import {NoSubmitDirective} from "../application/controls/no-sumbit/no-submit.directive";
import {CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule} from "@angular/core";
import {CommonModule, registerLocaleData} from "@angular/common";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
  MatPaginatorIntl,
  MatTreeModule
} from "@angular/material";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import localePt from '@angular/common/locales/pt';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CovalentSearchModule} from "@covalent/core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {DataComponent} from "../application/controls/data/data.component";
import {PieChartModule} from "@swimlane/ngx-charts";
import {SystemComponent} from "../application/presentation/system.component";
import {GroupFormComponent} from "../application/presentation/authenticated/access/groups/insert-group/group-form/group-form.component";
import {ViewGroupComponent} from "../application/presentation/authenticated/access/groups/view-group/view-group.component";
import {InsertGroupComponent} from "../application/presentation/authenticated/access/groups/insert-group/insert-group.component";
import {UpdateGroupComponent} from "../application/presentation/authenticated/access/groups/update-group/update-group.component";
import {UserViewComponent} from "../application/presentation/authenticated/access/users/user-view.component";
import {ConsultUsersComponent} from "../application/presentation/authenticated/access/users/consult-users/consult-users.component";
import {ViewUserComponent} from "../application/presentation/authenticated/access/users/view-user/view-user.component";
import {InsertUserComponent} from "../application/presentation/authenticated/access/users/insert-user/insert-user.component";
import {UserFormComponent} from "../application/presentation/authenticated/access/users/insert-user/user-form/user-form.component";
import {LinkPermissionsComponent} from "../application/presentation/authenticated/access/groups/insert-group/group-form/link-permissions/link-permissions.component";
import {UpdatePasswordComponent} from "../application/presentation/authenticated/access/users/update-password/update-password.component";
import {RootFormComponent} from "../application/presentation/authenticated/access/users/insert-user/user-form/root-form/root-form.component";
import {UpdatePasswordDialogComponent} from "../application/presentation/authenticated/access/users/update-password-dialog.component";
import {UpdateUserComponent} from "../application/presentation/authenticated/access/users/update-user/update-user.component";
import {ConsultGroupsComponent} from "../application/presentation/authenticated/access/groups/consult-groups/consult-groups.component";
import {GroupsViewComponent} from "../application/presentation/authenticated/access/groups/groups-view.component";
import {AccessViewComponent} from "../application/presentation/authenticated/access/access-view.component";
import {ApplicationViewComponent} from "../application/presentation/authenticated/access/applications/application-view.component";
import {ConsultApplicationsComponent} from "../application/presentation/authenticated/access/applications/consult-applications/consult-applications.component";
import {InsertApplicationComponent} from "../application/presentation/authenticated/access/applications/insert-application/insert-application.component";
import {UpdateApplicationComponent} from "../application/presentation/authenticated/access/applications/update-application/update-application.component";
import {ViewApplicationComponent} from "../application/presentation/authenticated/access/applications/view-application/view-application.component";
import {ApplicationRepository} from "./repository/application.repository";
import {ApplicationFormComponent} from "../application/presentation/authenticated/access/applications/insert-application/application-form/application-form.component";
import {TokenRepository} from "./repository/token.repository";
import {
  AccessGroupDataViewComponent
} from "../application/presentation/authenticated/access/groups/view-group/access-group-data-view/access-group-data-view.component";
import {TreePermissionsViewComponent} from "../application/presentation/authenticated/access/recursive/tree-permissions-view.component";
import {AccessGroupPermissionRepository} from "./repository/accessGroupPermission.repository";
import {TestComponent} from "../application/presentation/authenticated/access/test/test.component";
import {TestRepository} from "./repository/test.repository";

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

registerLocaleData(localePt, 'pt-BR');

// Custom TranslateLoader while using AoT compilation
export function customTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/**
 *
 */
// @ts-ignore
@NgModule({
  declarations: [
    // Directives
    NoSubmitDirective,

    // PIPES
    FilterPipe,
    UserInitialsPipe,

    // COMPONENTS
    SystemComponent,
    LoginComponent,
    AuthenticatedViewComponent,

    // CONTROLS
    CrudViewComponent,
    ListPageComponent,
    DetailPageComponent,
    FormPageComponent,
    EmConstrucaoComponent,
    EvDatepicker,
    CpfValidator,
    CnpjValidator,
    DocumentoPipe,
    ButtonToggleAdvancedFiltersComponent,
    ButtonClearFiltersComponent,
    NoRecordsFoundComponent,

    FirstUppercasePipe,

    //Cadastros
    FormToolbarComponent,
    ListTableComponent,
    EntityFormComponent,

    // Configuracoes
    AccessViewComponent,

    // Grupos de acesso
    GroupFormComponent,
    UpdateGroupComponent,
    InsertGroupComponent,
    ConsultGroupsComponent,
    ViewGroupComponent,
    GroupsViewComponent,
    AccessGroupDataViewComponent,

    // User
    UserViewComponent,
    ConsultUsersComponent,
    ViewUserComponent,
    InsertUserComponent,
    UserFormComponent,
    UpdateUserComponent,
    UpdatePasswordDialogComponent,
    RootFormComponent,
    LinkPermissionsComponent,
    UpdatePasswordComponent,

    // Test
    TestComponent,

    // Application
    ApplicationViewComponent,
    ConsultApplicationsComponent,
    InsertApplicationComponent,
    UpdateApplicationComponent,
    UpdateApplicationComponent,
    ViewApplicationComponent,

    DataComponent,

    // Has Permission
    HasPermissionDirective,
    ApplicationFormComponent,

    TreePermissionsViewComponent

  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    SystemRoutingModule,
    HttpClientModule,
    CovalentSearchModule,
    MatTreeModule,
    HttpClientJsonpModule,

    SharedModule,

    // Translate i18n
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (customTranslateLoader),
        deps: [HttpClient]
      }
    }),
    PieChartModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [NoSubmitDirective],
  entryComponents: [
    DeleteDialogComponent,
    UpdatePasswordComponent,
    UpdatePasswordDialogComponent],
  providers: [

    // Repositories
    UserRepository,
    PermissionRepository,
    ApplicationRepository,
    GroupRepository,
    TokenRepository,
    AccessGroupPermissionRepository,
    TestRepository,

    // Services
    Describer,
    WildcardService,
    PaginationService,
    AuthenticationService,

    UserViewComponent,
    AccessViewComponent,

    DialogService,
    MessageService,

    {
      useValue: appearance,
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS
    },

    {
      multi: true,
      useClass: Interceptor,
      provide: HTTP_INTERCEPTORS
    },

    // Internacionalizacao MatPaginator
    {provide: MatPaginatorIntl, useValue: getPaginatorIntl()},
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [SystemComponent]
})
export class SystemModule {
}
