import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, Renderer} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions, MatSnackBar} from '@angular/material';
import {AuthenticatedViewComponent} from '../../../../authenticated-view.component';
import {debounce} from "../../../../../../utils/debounce";
import {FormBuilder, FormControl, Validators} from "@angular/forms"
import {CrudViewComponent} from "../../../../../../controls/crud/crud-view.component";
import {User} from "../../../../../../../domain/entity/user.model";
import 'rxjs/add/operator/debounceTime';
import {AuthenticationService} from "../../../../../../../domain/services/authentication.service";
import {TenantRepository} from "../../../../../../../domain/repository/tenant.repository";
import {Tenant} from "../../../../../../../domain/entity/tenant.model";

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['../../user.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    }
  ]
})
export class UserFormComponent extends CrudViewComponent implements OnInit {

  tenants: any = [];

  @Input() entity: User = new User();

  @Output() save: EventEmitter<User> = new EventEmitter();

  users: any;

  user: User = new User();

  public debounce = debounce;

  constructor(public snackBar: MatSnackBar,
              public activatedRoute: ActivatedRoute,
              private tenantRepository: TenantRepository,
              @Inject(ElementRef) public element: ElementRef,
              public fb: FormBuilder, public renderer: Renderer,
              public authenticationService: AuthenticationService) {

    super(snackBar, element, fb, renderer, activatedRoute);

  }

  ngOnInit() {
    this.entity.enable = true;

    this.form = this.fb.group({
      name: new FormControl({value: '', disabled: false}, Validators.required),
      username: ['username', [Validators.required/*, Validators.email*/]],
      tenant: ['tenant', []],
    });
  }

  emit(entity: User) {
    this.save.emit(entity);
  }

  public normalizeTenant() {
    if (this.isString(this.entity.tenant)) {
      this.entity.tenant = null;
    }
  }

  public isString(value:any): boolean {
    return typeof value === 'string';
  }

  public displayIdentificationAccessGroup(tenant: Tenant) {
    return tenant && tenant.identification ? tenant.identification : null;
  }

  public listTenants() {
    let identificationOfTenant = this.entity.tenant || null;
    if (this.isString(identificationOfTenant) && !(identificationOfTenant as any).length) {
      this.tenants = [];
      return;
    }

    this.tenantRepository.listByFilters({defaultFilter: this.entity.tenant, ativoFilter: true})
        .subscribe((result) => {
          this.tenants = result.content;
        });
  }
}
