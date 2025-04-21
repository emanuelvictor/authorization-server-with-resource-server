import {Component} from '@angular/core';
import {DefaultCanActivate} from "../../../has-permission/default-can-activate";
import {AuthenticationService} from "../../../../domain/services/authentication.service";
import {Router} from "@angular/router";

// @ts-ignore
@Component({
  selector: 'inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.scss']
})
export class InventoryViewComponent extends DefaultCanActivate {

  /**
   *
   * @param authenticationService
   * @param router
   */
  constructor(authenticationService: AuthenticationService, router: Router) {

    super(authenticationService, router);

    this.fallbackRoute = 'minha-conta';

    this.permissions = ['root']

  }
}
