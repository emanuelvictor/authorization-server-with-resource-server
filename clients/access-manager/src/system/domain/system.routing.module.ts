import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../application/presentation/login/login.component';
import {InsertPasswordComponent} from '../application/presentation/manage-password/insert-password.component';
import {RecoveryPasswordComponent} from '../application/presentation/manage-password/recovery-password.component';
import {AuthenticatedViewComponent} from "../application/presentation/authenticated/authenticated-view.component";
import {AuthenticationService} from "./services/authentication.service";
import {ConsultUsersComponent} from "../application/presentation/authenticated/access/users/consult-users/consult-users.component";
import {UserViewComponent} from "../application/presentation/authenticated/access/users/user-view.component";
import {InsertUserComponent} from "../application/presentation/authenticated/access/users/insert-user/insert-user.component";
import {UpdateUserComponent} from "../application/presentation/authenticated/access/users/update-user/update-user.component";
import {AccessViewComponent} from "../application/presentation/authenticated/access/access-view.component";
import {ViewUserComponent} from "../application/presentation/authenticated/access/users/view-user/view-user.component";
import {GroupsViewComponent} from "../application/presentation/authenticated/access/groups/groups-view.component";
import {InsertGroupComponent} from "../application/presentation/authenticated/access/groups/insert-group/insert-group.component";
import {UpdateGroupComponent} from "../application/presentation/authenticated/access/groups/update-group/update-group.component";
import {ViewGroupComponent} from "../application/presentation/authenticated/access/groups/view-group/view-group.component";
import {ConsultGroupsComponent} from "../application/presentation/authenticated/access/groups/consult-groups/consult-groups.component";
import {ConsultApplicationsComponent} from "../application/presentation/authenticated/access/applications/consult-applications/consult-applications.component";
import {InsertApplicationComponent} from "../application/presentation/authenticated/access/applications/insert-application/insert-application.component";
import {UpdateApplicationComponent} from "../application/presentation/authenticated/access/applications/update-application/update-application.component";
import {ViewApplicationComponent} from "../application/presentation/authenticated/access/applications/view-application/view-application.component";
import {ApplicationViewComponent} from "../application/presentation/authenticated/access/applications/application-view.component";
import {TestComponent} from "../application/presentation/authenticated/access/test/test.component";

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
            path: 'test', component: TestComponent,
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
            path: 'applications', component: ApplicationViewComponent,
            // canActivate: [ApplicationViewComponent],
            children: [
              {path: 'get', redirectTo: '', pathMatch: 'full'},
              {path: '', component: ConsultApplicationsComponent},
              {path: 'insert', component: InsertApplicationComponent},
              {path: 'edit/:id', component: UpdateApplicationComponent},
              {path: ':id/edit', component: UpdateApplicationComponent},
              {path: ':id', component: ViewApplicationComponent}
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
