import {Observable, throwError as observableThrowError} from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';


import {Router} from '@angular/router';
import {MessageService} from '../../domain/services/message.service';
import {MatSnackBar} from "@angular/material";
import {AuthenticationService} from "../../domain/services/authentication.service";
import {Access} from "../../infrastructure/authentication/access";

@Injectable()
export class Interceptor implements HttpInterceptor {

  /**
   * Instancia a partir do window o NProgress
   */
  progress = window['NProgress'];

  /**
   *
   * @param authenticationService
   * @param snackBar
   * @param messageService
   * @param router
   */
  constructor(private messageService: MessageService,
              private authenticationService: AuthenticationService,
              private router: Router, private snackBar: MatSnackBar) {
  }

  /**
   * Intercepta todas as requisições
   * @param {HttpRequest<>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<>>}
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.progress.start();

    if (this.authenticationService.access && this.authenticationService.access.access_token && req.url.indexOf('oauth2') <= 0)
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authenticationService.access.access_token}`
        }
      });

    if (this.authenticationService.access && this.authenticationService.access.access_token && this.authenticationService.access.isInvalidAccessToken && req.url.indexOf('oauth2') <= 0) {
      return this.authenticationService.getAccessTokenByRefreshToken(this.authenticationService.access.refresh_token)
        .mergeMap(value => {
          this.authenticationService.access = new Access(value);
          return this.intercept(req, next);
        })
    } else
      return next.handle(req)
        .do(evt => {

          if (evt instanceof HttpResponse)
            this.progress.done();

          else
            this.progress.inc(0.4);

        })
        .catch(this.catchErrors());

  }

  /**
   * Função privada, captura os erros
   * @returns {(res: any) => ErrorObservable}
   */
  private catchErrors() {
    /**
     * Encerra progress
     */
    this.progress.done();

    return (res: any) => {

      if (res.error) {

        // Invalid refresh token handler
        if (res.error.error && res.error.error === 'invalid_grant' && res.error.error_description && res.error.error_description.indexOf('nvalid refresh token') > 0) {
          this.authenticationService.authorizationCode(window.location.href.substring(window.location.href.indexOf('#/') + 1, window.location.href.length))
          return this.innerHandler(res)
        }

        // Invalid access token error
        if (res.error.error && res.error.error === 'invalid_token' && res.error.error_description && res.error.error_description.indexOf('nvalid access token') > 0) {
          this.authenticationService.authorizationCode(window.location.href.substring(window.location.href.indexOf('#/') + 1, window.location.href.length))
          return this.innerHandler(res)
        }

        // Invalid access token error
        if (res.error.error && res.error.error === 'invalid_token' && res.error.error_description && res.error.error_description.indexOf('revoked') > 0) {
          this.authenticationService.authorizationCode(window.location.href.substring(window.location.href.indexOf('#/') + 1, window.location.href.length))
          return this.innerHandler(res)
        }

        if (typeof res.error === 'string')
          res.error = JSON.parse(res.error)

        this.error(res.error.message);

      }

      if(res.status === 403)
        this.error('Acesso negado!')

      return this.innerHandler(res);
    };
  }

  /**
   *
   * @param res
   */
  private innerHandler(res): Observable<never> {

    this.progress.done();

    return observableThrowError(res)

  }

  /**
   *
   * @param message
   */
  public error(message: string) {
    this.messageService.toastError(message);
  }
}
