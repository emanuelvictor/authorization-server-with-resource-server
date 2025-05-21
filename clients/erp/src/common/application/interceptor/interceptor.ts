import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, mergeMap, Observable, throwError as observableThrowError, tap } from 'rxjs';


import { AuthenticationService } from '../services/authentication/authentication.service';
import { Access } from '../services/authentication/access';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authenticationService.access && this.authenticationService.access.access_token && req.url.indexOf('oauth2') <= 0)
      if (this.authenticationService.tenantIdentification)
        req = req.clone({
          setHeaders: {
            TenantIdentification: this.authenticationService.tenantIdentification,
            Authorization: `Bearer ${this.authenticationService.access.access_token}`
          }
        });
      else
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${this.authenticationService.access.access_token}`
          }
        });

    if (this.authenticationService.access && this.authenticationService.access.access_token && this.authenticationService.access.isInvalidAccessToken() && req.url.indexOf('oauth2') <= 0)
      return this.authenticationService.getAccessTokenByRefreshToken(this.authenticationService.access.refresh_token).pipe(
        mergeMap((value : any) => {
          this.authenticationService.access = new Access(value);
          return this.intercept(req, next);
        })
      )
    else
      return next.handle(req).pipe(
        tap(() => { }),
        catchError(this.catchErrors())
      )
  }

  /**
   * Função privada, captura os erros
   */
  private catchErrors() {

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

      if (res.status === 403)
        this.error('Acesso negado!')

      return this.innerHandler(res);
    };
  }

  private innerHandler(res: any): Observable<never> {

    return observableThrowError(res)

  }

  public error(message: string) {
    console.error(message)
  }
}
