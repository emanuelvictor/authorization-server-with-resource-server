import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../domain/services/authentication.service';
import {MessageService} from '../../../domain/services/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

// @ts-ignore
@Component({
  selector: 'insert-password',
  templateUrl: 'insert-password.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class InsertPasswordComponent implements OnInit {
  password: FormControl;
  passForm: FormGroup;

  ngOnInit(): void {
    this.password = new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&+,.])[A-Za-z\d$@$!%*#?&+,.]{8,}$/)
    ]);

    this.passForm = new FormGroup({
      'password': this.password
    });
  }

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
  public createPassword(form: NgForm) {

    for (let inner in this.passForm.controls) {
      this.passForm.get(inner).markAsTouched();
    }
    //this.password.markAsTouched();

    //this.password.markAsTouched();
    if (this.user.password != this.user.confirmPassword) {
      this.messageService.toastWarning('As duas passwords não conferem.');
      return;
    }

    if (this.passForm.invalid) {
      this.messageService.toastWarning('Favor informar uma password válida.');
      return;
    }

    this.authService.resetPassword(this.user.code, this.user.password)
      .then(() => {
        this.messageService.toastSuccess('Senha cadastrada com sucesso');
        this.router.navigate(['/login']);
      })
      .catch((ex) => {
        this.messageService.toastError('O prazo para cadastrar a password foi expirado.')
      });
  }
}
