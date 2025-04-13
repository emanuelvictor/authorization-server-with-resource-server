import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthenticatedViewComponent} from '../../../../authenticated-view.component';
import {Group} from "../../../../../../../domain/entity/group.model";
import {PermissionRepository} from "../../../../../../../domain/repository/permission.repository";
import {Permission} from "../../../../../../../domain/entity/permission.model";
import {AccessGroupPermissionRepository} from "../../../../../../../domain/repository/accessGroupPermission.repository";

// @ts-ignore
@Component({
  selector: 'access-group-data-view',
  templateUrl: 'access-group-data-view.component.html',
  styleUrls: ['../../groups.component.scss']
})
export class AccessGroupDataViewComponent implements OnInit {

  @Input()
  readOnly: boolean = false;

  @Input()
  group: Group;

  rootPermission: Permission;

  constructor(homeView: AuthenticatedViewComponent,
              public activatedRoute: ActivatedRoute,
              public permissionRepository: PermissionRepository) {
    homeView.toolbar.subhead = 'Grupo de Acesso / Detalhes';
  }

  async ngOnInit() {
    this.permissionRepository.findById(1).subscribe(permission => {
      this.rootPermission = permission
    })
  }
}
