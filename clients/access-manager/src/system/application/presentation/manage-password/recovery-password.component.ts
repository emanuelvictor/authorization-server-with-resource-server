import {Component} from '@angular/core';
import {AuthenticationService} from '../../../domain/services/authentication.service';
import {MessageService} from '../../../domain/services/message.service';
import {ActivatedRoute, Router} from '@angular/router';

// @ts-ignore
@Component({
  selector: 'recovery-password',
  templateUrl: 'recovery-password.component.html',
  styleUrls: ['../login/login.component.scss', 'manage-password.component.scss']
})
export class RecoveryPasswordComponent {

  /**
   *
   */
  public user: any = {};

  /**
   *
   * @param authService
   * @param messageService
   * @param router
   * @param activatedRoute
   */
  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public messageService: MessageService,
              public authService: AuthenticationService) {
    this.user.code = this.activatedRoute.snapshot.params.code || null;
  }

  /**
   *
   * @param form
   */
  public recoverPassword(form) {

    if (form.invalid) {
      this.messageService.toastWarning('Favor informar um e-mail válido.');
      return;
    }

    this.authService.recoverPassword(this.user.email)
      .then(() => {
        this.messageService.toastSuccess('Favor verificar seu e-mail para redefinir sua senha.');
        this.router.navigate(['/login']);
      });
  }
}
