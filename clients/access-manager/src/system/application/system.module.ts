import {SharedModule} from '../../shared/shared.module';
import {Interceptor} from './interceptor/interceptor';
import {Describer} from './describer/describer';
import {AuthenticationService} from '../domain/services/authentication.service';
import {WildcardService} from '../domain/services/wildcard.service';
import {MessageService} from '../domain/services/message.service';
import {DialogService} from '../domain/services/dialog.service';
import {LoginComponent} from './presentation/login/login.component';
import {AuthenticatedViewComponent} from './presentation/authenticated/authenticated-view.component';
import {DeleteDialogComponent} from './controls/delete-dialog/delete-dialog.component';
import {CrudViewComponent} from './controls/crud/crud-view.component';
import {ListPageComponent} from './controls/crud/list/list-page.component';
import {DetailPageComponent} from './controls/crud/detail/detail-page.component';
import {FormPageComponent} from './controls/crud/form/form-page.component';
import {getPaginatorIntl} from '../domain/services/portuguese-paginator-intl';
import {PaginationService} from '../domain/services/pagination.service';
import {SystemRoutingModule} from "./system.routing.module";
import {EmConstrucaoComponent} from "./controls/not-found/em-construcao.component";
import {GroupRepository} from "../domain/repository/group.repository";
import {UserRepository} from "../domain/repository/user.repository";
import {PermissionRepository} from "../domain/repository/permission.repository";
import {EvDatepicker} from "./controls/ev-datepicker/ev-datepicker";
import {FirstUppercasePipe} from "./utils/utils";
import {HasPermissionDirective} from "./has-permission/has-permission";
import {CnpjValidator, CpfValidator} from "./controls/validators/validators";
import {DocumentoPipe} from "./controls/documento-pipe/documento-pipe";
import {UserInitialsPipe} from "./controls/pipes/user-initials.pipe";
import {FormToolbarComponent} from 'system/application/controls/crud/cadastros/form-toolbar/form-toolbar.component';
import {ListTableComponent} from 'system/application/controls/crud/cadastros/list-table/list-table.component';
import {EntityFormComponent} from 'system/application/controls/crud/cadastros/entity-form/entity-form.component';
import {
    ButtonToggleAdvancedFiltersComponent
} from 'system/application/controls/button-toggle-advanced-filters/button-toggle-advanced-filters.component';
import {
    ButtonClearFiltersComponent
} from 'system/application/controls/button-clear-filters/button-clear-filters.component';
import {NoRecordsFoundComponent} from "system/application/controls/no-records-found/no-records-found.component";
import {FilterPipe} from "./controls/pipes/filter.pipe";
import {NoSubmitDirective} from "./controls/no-sumbit/no-submit.directive";
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
import {DataComponent} from "./controls/data/data.component";
import {PieChartModule} from "@swimlane/ngx-charts";
import {SystemComponent} from "./presentation/system.component";
import {
    GroupFormComponent
} from "./presentation/authenticated/access/groups/insert-group/group-form/group-form.component";
import {
    ViewGroupComponent
} from "./presentation/authenticated/access/groups/view-group/view-group.component";
import {
    InsertGroupComponent
} from "./presentation/authenticated/access/groups/insert-group/insert-group.component";
import {
    UpdateGroupComponent
} from "./presentation/authenticated/access/groups/update-group/update-group.component";
import {UserViewComponent} from "./presentation/authenticated/access/users/user-view.component";
import {
    ConsultUsersComponent
} from "./presentation/authenticated/access/users/consult-users/consult-users.component";
import {ViewUserComponent} from "./presentation/authenticated/access/users/view-user/view-user.component";
import {
    InsertUserComponent
} from "./presentation/authenticated/access/users/insert-user/insert-user.component";
import {
    UserFormComponent
} from "./presentation/authenticated/access/users/insert-user/user-form/user-form.component";
import {
    LinkPermissionsComponent
} from "./presentation/authenticated/access/groups/insert-group/group-form/link-permissions/link-permissions.component";
import {
    UpdatePasswordComponent
} from "./presentation/authenticated/access/users/update-password/update-password.component";
import {
    RootFormComponent
} from "./presentation/authenticated/access/users/insert-user/user-form/root-form/root-form.component";
import {
    UpdatePasswordDialogComponent
} from "./presentation/authenticated/access/users/update-password-dialog.component";
import {
    UpdateUserComponent
} from "./presentation/authenticated/access/users/update-user/update-user.component";
import {
    ConsultGroupsComponent
} from "./presentation/authenticated/access/groups/consult-groups/consult-groups.component";
import {GroupsViewComponent} from "./presentation/authenticated/access/groups/groups-view.component";
import {AccessViewComponent} from "./presentation/authenticated/access/access-view.component";
import {
    AccessGroupDataViewComponent
} from "./presentation/authenticated/access/groups/view-group/access-group-data-view/access-group-data-view.component";
import {
    TreePermissionsViewComponent
} from "./presentation/authenticated/access/recursive/tree-permissions-view.component";
import {AccessGroupPermissionRepository} from "../domain/repository/accessGroupPermission.repository";
import {
    TenantFormComponent
} from "./presentation/authenticated/access/tenants/insert-tenant/tenant-form/tenant-form.component";
import {
    InsertTenantComponent
} from "./presentation/authenticated/access/tenants/insert-tenant/insert-tenant.component";
import {
    ConsultTenantsComponent
} from "./presentation/authenticated/access/tenants/consult-tenants/consult-tenants.component";
import {
    ViewTenantComponent
} from "./presentation/authenticated/access/tenants/view-tenant/view-tenant.component";
import {TenantsViewComponent} from "./presentation/authenticated/access/tenants/tenants-view.component";
import {
    TenantDataViewComponent
} from "./presentation/authenticated/access/tenants/view-tenant/tenant-data-view/tenant-data-view.component";
import {TenantRepository} from "../domain/repository/tenant.repository";

const appearance: MatFormFieldDefaultOptions = {
    appearance: 'outline'
};

registerLocaleData(localePt, 'pt-BR');

// Custom TranslateLoader while using AoT compilation
export function customTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// @ts-ignore
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

        // Tenants
        TenantFormComponent,
        InsertTenantComponent,
        ConsultTenantsComponent,
        ViewTenantComponent,
        TenantsViewComponent,
        TenantDataViewComponent,

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


        DataComponent,

        // Has Permission
        HasPermissionDirective,

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
        GroupRepository,
        TenantRepository,
        AccessGroupPermissionRepository,

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