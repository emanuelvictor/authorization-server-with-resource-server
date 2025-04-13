import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthenticationService } from '../../../domain/services/authentication.service';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';

/**
 *
 */

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

// @ts-ignore
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    }
  ]
})
export class LoginComponent {
  /**
   *
   */
  public user: any = {};

  /**
   *
   * @param router
   * @param authenticationService
   */
  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  /**
   *
   */
  public login() {
  }
}
