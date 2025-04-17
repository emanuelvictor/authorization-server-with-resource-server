import {Component, ElementRef, Inject, Input, OnInit, Renderer} from '@angular/core';
import {CrudViewComponent} from "../../../../../../controls/crud/crud-view.component";
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions, MatSnackBar} from "@angular/material";
import {ActivatedRoute} from "@angular/router";
import {PermissionRepository} from "../../../../../../../domain/repository/permission.repository";
import {Permission} from "../../../../../../../domain/entity/permission.model";
import {Group} from "../../../../../../../domain/entity/group.model";
import {GroupPermission} from "../../../../../../../domain/entity/group-permission.model";
import {GroupRepository} from "../../../../../../../domain/repository/group.repository";

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

// @ts-ignore
@Component({
  selector: 'group-form',
  templateUrl: 'group-form.component.html',
  styleUrls: ['../../groups.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    }
  ]
})
export class GroupFormComponent extends CrudViewComponent implements OnInit {

  /**
   *
   */
  permissions: Permission[];

  /**
   *
   */
  @Input()
  entity: Group = new Group();

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
    this.entity.enable = true;
    this.form = this.fb.group({
      name: ['name', [Validators.required]]
    });
  }

}
