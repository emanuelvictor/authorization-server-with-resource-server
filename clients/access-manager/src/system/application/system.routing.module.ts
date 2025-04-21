import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './presentation/login/login.component';
import {InsertPasswordComponent} from './presentation/manage-password/insert-password.component';
import {RecoveryPasswordComponent} from './presentation/manage-password/recovery-password.component';
import {AuthenticatedViewComponent} from "./presentation/authenticated/authenticated-view.component";
import {AuthenticationService} from "../domain/services/authentication.service";
import {ConsultUsersComponent} from "./presentation/authenticated/access/users/consult-users/consult-users.component";
import {UserViewComponent} from "./presentation/authenticated/access/users/user-view.component";
import {InsertUserComponent} from "./presentation/authenticated/access/users/insert-user/insert-user.component";
import {UpdateUserComponent} from "./presentation/authenticated/access/users/update-user/update-user.component";
import {AccessViewComponent} from "./presentation/authenticated/access/access-view.component";
import {ViewUserComponent} from "./presentation/authenticated/access/users/view-user/view-user.component";
import {GroupsViewComponent} from "./presentation/authenticated/access/groups/groups-view.component";
import {InsertGroupComponent} from "./presentation/authenticated/access/groups/insert-group/insert-group.component";
import {UpdateGroupComponent} from "./presentation/authenticated/access/groups/update-group/update-group.component";
import {ViewGroupComponent} from "./presentation/authenticated/access/groups/view-group/view-group.component";
import {
  ConsultGroupsComponent
} from "./presentation/authenticated/access/groups/consult-groups/consult-groups.component";
import {TenantsViewComponent} from "./presentation/authenticated/access/tenants/tenants-view.component";
import {
  ConsultTenantsComponent
} from "./presentation/authenticated/access/tenants/consult-tenants/consult-tenants.component";
import {
  InsertTenantComponent
} from "./presentation/authenticated/access/tenants/insert-tenant/insert-tenant.component";
import {
  ViewTenantComponent
} from "./presentation/authenticated/access/tenants/view-tenant/view-tenant.component";
import {ProductsViewComponent} from "./presentation/authenticated/stock/products/products-view.component";
import {InventoryViewComponent} from "./presentation/authenticated/stock/inventory-view.component";
import {
  ConsultProductsComponent
} from "./presentation/authenticated/stock/products/consult-products/consult-products.component";
import {
  InsertProductComponent
} from "./presentation/authenticated/stock/products/insert-product/insert-product.component";
import {
  UpdateProductComponent
} from "./presentation/authenticated/stock/products/update-product/update-product.component";
import {ViewProductComponent} from "./presentation/authenticated/stock/products/view-product/view-product.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'recuperar-senha', component: RecoveryPasswordComponent},
  {path: 'cadastrar-senha/:codigo', component: InsertPasswordComponent},
  {
    path: '', component: AuthenticatedViewComponent, canActivate: [AuthenticationService],
    children: [
      {
        path: '', redirectTo: 'access', pathMatch: 'full',
      },
      {
        path: 'access',
        component: AccessViewComponent,
        children: [
          {
            path: '', redirectTo: 'users', pathMatch: 'full',
          },
          {
            path: 'users', component: UserViewComponent,
            // canActivate: [ApplicationViewComponent],
            children: [
              {path: 'get', redirectTo: '', pathMatch: 'full'},
              {path: '', component: ConsultUsersComponent},
              {path: 'insert', component: InsertUserComponent},
              {path: 'edit/:id', component: UpdateUserComponent},
              {path: ':id/edit', component: UpdateUserComponent},
              {path: ':id', component: ViewUserComponent}
            ]
          },
          {
            path: 'groups', component: GroupsViewComponent,
            children: [
              {path: 'get', redirectTo: '', pathMatch: 'full'},
              {path: '', component: ConsultGroupsComponent},
              {path: 'insert', component: InsertGroupComponent},
              {path: 'edit/:id', component: UpdateGroupComponent},
              {path: ':id/edit', component: UpdateGroupComponent},
              {path: ':id', component: ViewGroupComponent}
            ]
          },
          {
            path: 'tenants', component: TenantsViewComponent,
            children: [
              {path: 'get', redirectTo: '', pathMatch: 'full'},
              {path: '', component: ConsultTenantsComponent},
              {path: 'insert', component: InsertTenantComponent},
              {path: ':id', component: ViewTenantComponent}
            ]
          }
        ]
      },
      {
        path: 'stocks',
        component: InventoryViewComponent,
        children: [
          {
            path: '', redirectTo: 'products', pathMatch: 'full',
          },
          {
            path: 'products', component: ProductsViewComponent,
            children: [
              {path: 'get', redirectTo: '', pathMatch: 'full'},
              {path: '', component: ConsultProductsComponent},
              {path: 'insert', component: InsertProductComponent},
              {path: 'edit/:id', component: UpdateProductComponent},
              {path: ':id/edit', component: UpdateProductComponent},
              {path: ':id', component: ViewProductComponent}
            ]
          }
        ]
      }
    ]
  }
];

/**
 *
 */
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: []
})
export class SystemRoutingModule {
}
