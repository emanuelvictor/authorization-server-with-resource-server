import {Component, ElementRef, Inject, Input, OnInit, Renderer} from '@angular/core';
import {CrudViewComponent} from "../../../../../../controls/crud/crud-view.component";
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions, MatSnackBar} from "@angular/material";
import {ActivatedRoute} from "@angular/router";
import {Permission} from "../../../../../../../domain/entity/permission.model";
import {Group} from "../../../../../../../domain/entity/group.model";

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

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

  permissions: Permission[];

  @Input()
  entity: Group = new Group();

  constructor(public snackBar: MatSnackBar,
              public activatedRoute: ActivatedRoute,
              @Inject(ElementRef) public element: ElementRef,
              public fb: FormBuilder, public renderer: Renderer) {
    super(snackBar, element, fb, renderer, activatedRoute);
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['name', [Validators.required]]
    });
  }

  setChecked(checked: boolean){
    this.entity.internal = checked;
  }
}
