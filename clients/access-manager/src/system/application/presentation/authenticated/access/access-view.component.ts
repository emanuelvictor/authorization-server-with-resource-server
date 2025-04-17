import {Component} from '@angular/core';
import {DefaultCanActivate} from "../../../has-permission/default-can-activate";
import {AuthenticationService} from "../../../../domain/services/authentication.service";
import {Router} from "@angular/router";

// @ts-ignore
@Component({
  selector: 'access-view',
  templateUrl: './access-view.component.html',
  styleUrls: ['./access-view.component.scss']
})
export class AccessViewComponent extends DefaultCanActivate {

  /**
   *
   * @param authenticationService
   * @param router
   */
  constructor(authenticationService: AuthenticationService, router: Router) {

    super(authenticationService, router);

    this.fallbackRoute = 'minha-conta';

    this.permissions = ['root', 'users', 'users/get', 'groups', 'groups/get', 'tenants/get']

  }
}
