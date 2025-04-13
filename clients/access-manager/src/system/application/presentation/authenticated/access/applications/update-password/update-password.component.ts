import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ApplicationRepository} from "../../../../../../domain/repository/application.repository";
import {AbstractControl, FormBuilder, ValidatorFn} from "@angular/forms";
import {MessageService} from "../../../../../../domain/services/message.service";

// @ts-ignore
@Component({
  selector: 'update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {

  /**
   *
   */
  public applicationDialog: any = {
    newPassword: '',
    confirmNewPassword: ''
  };

  public form: any;

  /**
   *
   * @param dialogRef
   * @param data
   * @param messageService
   * @param applicationRepository
   * @param fb
   */
  constructor(public messageService: MessageService,
              private applicationRepository: ApplicationRepository,
              public dialogRef: MatDialogRef<UpdatePasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder) {
  }


  /**
   *
   */
  ngOnInit() {
    this.form = this.fb.group({
      newPassword: ['newPassword', [this.newPasswordValidator()]],
      confirmNewPassword: ['confirmNewPassword', [this.confirmPasswordValidator()]],
    });
  }

  /**
   *
   * @param exception
   * @param validatorFn
   */
  public newPasswordValidator(exception?: string, validatorFn?: ValidatorFn): ValidatorFn {
    if (validatorFn)
      return validatorFn;
    return (c: AbstractControl): { [key: string]: any } => {

      if (!c.value || !c.value.length) return {
        exception: exception ? exception : 'Defina uma a nova senha'
      };

      for (let i = 0; i < c.value; i++) {
        if (!c.value[i].match('/^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&+,.])[A-Za-z\\d$@$!%*#?&+,.]{8,}$/')) {
          return {
            exception: exception ? exception : 'Mínimo de 8 caracteres com letras, números e caracteres especiais'
          }
        }
      }

      return null
    }
  }

  /**
   *
   * @param exception
   * @param validatorFn
   */
  public confirmPasswordValidator(exception?: string, validatorFn?: ValidatorFn): ValidatorFn {
    if (validatorFn)
      return validatorFn;
    return (c: AbstractControl): { [key: string]: any } => {

      if (!c.value || !c.value.length) return {
        exception: exception ? exception : 'Confirme a nova senha'
      };

      if (this.applicationDialog.newPassword !== c.value)
        return {
          exception: exception ? exception : 'A nova senha e a confirmação não coincidem'
        };

      return null
    }
  }


  /**
   *
   * @param form
   */
  public updatePassword(form) {

    if (form.invalid) {
      return
    }

    const {newPassword} = this.applicationDialog;

    this.applicationRepository.changePassword(this.data.application, newPassword)
      .then(result => {
        if (result) {
          this.dialogRef.close();
          this.messageService.toastSuccess('Senha atualizada com sucesso');
        }
      })
  }
}
