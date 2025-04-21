import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {isNullOrUndefined} from "util";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {getParameterByName, parseJwt} from "../../application/utils/utils";
import {Access} from "../../infrastructure/authentication/access";
import {UserDetails} from "../../infrastructure/authentication/user-details";
import {User} from "../entity/user.model";
import {environment} from "../../../environments/environment";
import {RequestOptions} from "@angular/http";

@Injectable()
export class AuthenticationService implements CanActivate, CanActivateChild {

  private origin = window.location.origin + window.location.pathname;

  public user: User;

  public access: Access;

  /**
   * Represents the tenant identifier choice by ROOT user
   */
  public tenantIdentification: string;

  /**
   * Utilized for the transaction control.
   * This prevents the transaction from occurring twice.
   */
  getPromiseLoggedUserInstance: Promise<UserDetails>;

  constructor(private router: Router, private http: HttpClient) {
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state)
  }

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.getObservedLoggedUser().map(auth => {
      if (isNullOrUndefined(auth)) {
        this.authorizationCode(state.url);
        return false
      } else {
        const stateReturned: string = getParameterByName('state');
        if (stateReturned) {
          this.router.navigate([stateReturned]).then(r => {
          })
        }
        return true
      }
    })
  }

  public getObservedLoggedUser(): Observable<UserDetails> {
    return new Observable(observer => {
      this.getPromiseLoggedUser().then(result => observer.next(result)).catch(err => observer.error(err))
    })
  }

  public getPromiseLoggedUser(): Promise<UserDetails> {
    this.getPromiseLoggedUserInstance = this.getPromiseLoggedUserInstance ? this.getPromiseLoggedUserInstance : new Promise<UserDetails>((resolve, reject) => {

      const authorizationCode: string = getParameterByName('code');
      if (this.access && this.access.isInvalidAccessToken) { // Have the access token and it is invalid, but have the refresh token, get the access token by refresh token

        this.getAccessTokenByRefreshToken(this.access.refresh_token).subscribe(result => {
          this.access = new Access(result);
          this.user = AuthenticationService.extractUserFromAccessToken(this.access);
          resolve(this.user)
        })

      } else if (!this.access && !authorizationCode) { // No have access token and no have code, must return null and redirect to SSO

        resolve(null)

      } else if ((!this.access || !this.access.access_token) && authorizationCode) { // No have access token but have code, must get the access token by authorization code.

        this.getAccessTokenByAuthorizationCode(authorizationCode).then(result => {
          this.access = new Access(result);
          console.log('access_token', this.access.access_token);
          console.log('refresh_token', this.access.refresh_token);
          this.user = AuthenticationService.extractUserFromAccessToken(this.access);
          resolve(this.user)
        }).catch(err => reject(err))

      } else if (this.access && this.access.access_token) {
        this.user = AuthenticationService.extractUserFromAccessToken(this.access);
        resolve(this.user)
      }
    })

    return this.getPromiseLoggedUserInstance
  }

  public getAccessTokenByAuthorizationCode(authorizationCode: string): Promise<Access> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    const body = `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${this.origin}&client_id=browser&client_secret=browser`;
    return this.http.post<Access>(`${environment.SSO}/oauth2/token`, body, {headers}).toPromise();
  }

  public getAccessTokenByRefreshToken(refreshToken: string): Observable<Access> { // TODO must return a promise too
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    const body = `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=browser&client_secret=browser`;
    return this.http.post<Access>(`${environment.SSO}/oauth2/token`, body, {headers});
  }

  private static extractUserFromAccessToken(access: Access): User {

    if (access.access_token) {
      const userToParse = parseJwt(access.access_token);

      const user: User = new User();
      user.username = userToParse.user_name;
      user.name = access.name;
      user.id = access.id;
      user.authorities = userToParse.authorities;

      return user
    }

    return null
  }

  public logout(): void {
    this.toSSO(`/logout`)
  }

  public resetPassword(code: any, password: any): Promise<any> {
    let params = new HttpParams();
    params = params.set('password', password);

    return this.http.post(`/insert-password/${code}`, params).toPromise();
  }

  public recoverPassword(email: any): Promise<any> {
    return this.http.get(`/recover-password/${email}`).toPromise();
  }

  public authorizationCode(state?: string) {
    this.toSSO(`/oauth2/authorize?response_type=code&client_id=browser&redirect_uri=${this.origin}` + (state ? '&state=' + state : ''));
  }

  public toSSO(path?: string) {
    window.location.href = `${environment.SSO}${path}`
  }
}
