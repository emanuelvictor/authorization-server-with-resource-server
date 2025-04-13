import {AuthenticationService} from "../../domain/services/authentication.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {HasPermissionDirective} from "./has-permission";

export abstract class DefaultCanActivate implements CanActivate {

  // Rota de fallback. O usuário será redirecionado para essa rota caso não tenha permissão de acesso a página.
  private _fallbackRoute: string = 'selecoes';

  // Authorities disponíveis para acesso á página.
  // O usuário deve ter  pelo menos uma delas.
  private _permissions: string[] = ['root', 'etapas', 'etapas/get', 'cursos', 'cursos/get', 'ramos-atuacao', 'ramos-atuacao/get', 'observacoes', 'observacoes/get'];

  get fallbackRoute(): string {
    return this._fallbackRoute;
  }

  set fallbackRoute(value: string) {
    this._fallbackRoute = value;
  }

  get permissions(): string[] {
    return this._permissions;
  }

  set permissions(value: string[]) {
    this._permissions = value;
  }

  /**
   *
   * @param authenticationService
   * @param router
   */
  constructor(public authenticationService: AuthenticationService, private router: Router) {
  }

  /**
   *
   * @param childRoute
   * @param state
   */
  canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    return this.authenticationService.getObservedLoggedUser().map(user => {
      for (let i = 0; i < this._permissions.length; i++) {
        const permission = this._permissions[i];

        if (HasPermissionDirective.checkPermission(user, [permission]))
          return true;
        else if (i === (this._permissions.length - 1)) {
          this.router.navigate([this._fallbackRoute]);
          return false
        }
      }
    })
  }

}
