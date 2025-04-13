import {Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef} from "@angular/core";
import {AuthenticationService} from "../../domain/services/authentication.service";

@Directive({selector: '[hasPermission]'})
export class HasPermissionDirective implements OnInit {

  /**
   *
   */
  private operation;

  /**
   *
   */
  private currentUser;

  /**
   *
   */
  private authorities = [];

  /**
   *
   * @param element
   * @param templateRef
   * @param viewContainer
   * @param authenticationService
   */
  constructor(private element: ElementRef,
              private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private authenticationService: AuthenticationService) {
  }

  /**
   *
   */
  ngOnInit() {
    if (this.authenticationService.user && this.authenticationService.user.authorities && this.authenticationService.user.authorities.length) {
      this.currentUser = this.authenticationService.user;
      this.updateView()
    }
  }

  /**
   *
   * @param val
   */
  @Input()
  set hasPermission(val) {
    this.authorities = val;
    this.updateView()
  }

  @Input()
  set hasPermissionOperation(operation: string) {
    this.operation = operation
  }

  /**
   *
   */
  private updateView() {
    if (HasPermissionDirective.checkPermission(this.currentUser, this.authorities)) {
      this.viewContainer.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainer.clear()
    }
  }

  /**
   *
   */
  public static checkPermission(currentUser, authorities) {

    let hasPermission = false;
    if (currentUser && currentUser.authorities) {
      for (const checkPermission of authorities) {
        const permissionFound = currentUser.authorities.find(x => x.toUpperCase() === checkPermission.toUpperCase());
        if (permissionFound)
          hasPermission = true
      }
    }

    return hasPermission
  }
}
