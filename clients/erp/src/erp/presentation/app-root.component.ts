import { Component } from "@angular/core";
import { AuthenticationService } from "../../common/application/services/authentication/authentication.service";

// @ts-ignore
@Component({
  "selector": 'app-root',
  template: `
  <nav>
   <router-outlet/>
   <button (click)=logout()>logout</button>
   </nav>
  `, standalone: false
})
export class AppRootComponent {

  constructor(private authenticationService: AuthenticationService) {

  }

  logout() {
    this.authenticationService.logout();
  }
}
