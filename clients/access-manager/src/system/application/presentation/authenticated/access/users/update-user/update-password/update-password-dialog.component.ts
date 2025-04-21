import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MessageService} from '../../../../../../../domain/services/message.service';
import {AbstractControl, FormBuilder, ValidatorFn, Validators} from "@angular/forms"
import {UserRepository} from "../../../../../../../domain/repository/user.repository";

// @ts-ignore
@Component({
  selector: 'update-password-dialog',
  templateUrl: 'update-password-dialog.component.html',
  styleUrls: ['./update-password-dialog.component.scss']
})
export class UpdatePasswordDialogComponent implements OnInit {

  /**
   *
   */
  public dialogUser: any = {
    actualPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };

  public form: any;

  /**
   *
   * @param dialogRef
   * @param data
   * @param userRepository
   * @param messageService
   * @param fb
   */
  constructor(public userRepository: UserRepository,
              public messageService: MessageService,
              public dialogRef: MatDialogRef<UpdatePasswordDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder) {
  }


  /**
   *
   */
  ngOnInit() {
    this.form = this.fb.group({
      actualPassword: ['actualPassword', [Validators.required]],
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

      if (this.dialogUser.novaSenha !== c.value)
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

    const {id} = this.data.user || null;
    const {actualPassword, newPassword} = this.dialogUser;

    this.userRepository.updatePassword(id, actualPassword, newPassword)
      .then(() => {
        this.dialogRef.close();
        this.messageService.toastSuccess('Senha atualizada com sucesso');
      });
  }

}
