import {Component} from '@angular/core';
import {DefaultCanActivate} from "../../../../has-permission/default-can-activate";
import {AuthenticationService} from "../../../../../domain/services/authentication.service";
import {Router} from "@angular/router";

// @ts-ignore
@Component({
  selector: 'user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent extends DefaultCanActivate {

  /**
   *
   * @param authenticationService
   * @param router
   */
  constructor(authenticationService: AuthenticationService, router: Router) {

    super(authenticationService, router);

    this.fallbackRoute = 'access/groups';

    this.permissions = ['root']

  }
}
