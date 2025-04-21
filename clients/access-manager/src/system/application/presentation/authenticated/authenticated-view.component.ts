import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingMode, LoadingType, TdLoadingService} from '@covalent/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {Subscription} from 'rxjs';
import {MessageService} from '../../../domain/services/message.service';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from "../../../domain/services/authentication.service";
import {User} from "../../../domain/entity/user.model";
import {UserRepository} from "../../../domain/repository/user.repository";
import {
  UpdatePasswordDialogComponent
} from "./access/users/update-user/update-password/update-password-dialog.component";

// @ts-ignore
@Component({
  selector: 'authenticated-view',
  templateUrl: './authenticated-view.component.html',
  styleUrls: ['./authenticated-view.component.scss']
})
export class AuthenticatedViewComponent implements OnInit, OnDestroy {
  /**
   *
   */
  public user: User;
  public routerSubscription: Subscription;
  public userSubscription: Subscription;

  /**
   *
   */
  public toolbar: any = {headline: 'Cadastros', subhead: ''};

  /**
   *
   * @param translate
   * @param activeRoute
   * @param messageService
   * @param loadingService
   * @param userRepository
   * @param dialog
   * @param router
   * @param authenticationService
   */
  constructor(private translate: TranslateService,
              private activeRoute: ActivatedRoute,
              private messageService: MessageService,
              private loadingService: TdLoadingService,
              private userRepository: UserRepository,
              private dialog: MatDialog, private router: Router,
              private authenticationService: AuthenticationService) {

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('pt-br');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('pt-br');

    this.loadingService.create({
      name: 'loadingLogin',
      mode: LoadingMode.Indeterminate,
      type: LoadingType.Circular,
      color: 'primary'
    })
  }

  /**
   *
   */
  ngOnInit() {
    this.getAuthenticatedUser();
  }

  /**
   *
   */
  public logout() {
    this.authenticationService.logout()
  }

  /**
   *
   */
  public getAuthenticatedUser() {
    this.user = this.authenticationService.user;
  }

  /**
   *
   */
  public openDialogChangePassword() {
    this.dialog.open(UpdatePasswordDialogComponent, {
      width: '400px',
      height: 'auto',
      data: {user: this.user || null}
    })
  }

  /**
   * Verifica se o usuário logado é ADMINISTRADOR e se está editando ele mesmo.
   */
  public itsMe(user: any): boolean {
    const authenticatedUser = this.user;
    return authenticatedUser && ((authenticatedUser as any).isRoot || (authenticatedUser as any).id === user.id)
  }

  /**
   *
   */
  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
    if (this.routerSubscription) this.routerSubscription.unsubscribe()
  }
}
