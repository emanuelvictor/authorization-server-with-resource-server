import {Component, ElementRef, Inject, Input, OnInit, Renderer} from '@angular/core';
import {CrudViewComponent} from "../../../../../../controls/crud/crud-view.component";
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions, MatSnackBar} from "@angular/material";
import {ActivatedRoute} from "@angular/router";
import {Permission} from "../../../../../../../domain/entity/permission.model";
import {Tenant} from "../../../../../../../domain/entity/tenant.model";

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

// @ts-ignore
@Component({
  selector: 'tenant-form',
  templateUrl: 'tenant-form.component.html',
  styleUrls: ['../../tenants.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    }
  ]
})
export class TenantFormComponent extends CrudViewComponent implements OnInit {

  /**
   *
   */
  permissions: Permission[];

  /**
   *
   */
  @Input()
  entity: Tenant = new Tenant();

  /**
   *
   * @param snackBar
   * @param activatedRoute
   * @param element
   * @param fb
   * @param renderer
   */
  constructor(public snackBar: MatSnackBar,
              public activatedRoute: ActivatedRoute,
              @Inject(ElementRef) public element: ElementRef,
              public fb: FormBuilder, public renderer: Renderer) {
    super(snackBar, element, fb, renderer, activatedRoute);
  }

  /**
   *
   */
  ngOnInit() {
    this.form = this.fb.group({
      identification: ['identification', [Validators.required]]
    });
  }

}
