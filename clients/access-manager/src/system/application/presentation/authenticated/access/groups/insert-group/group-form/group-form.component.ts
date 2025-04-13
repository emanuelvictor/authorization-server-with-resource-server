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
   * @param permissionRepository
   * @param fb
   * @param renderer
   */
  constructor(public snackBar: MatSnackBar,
              public activatedRoute: ActivatedRoute,
              @Inject(ElementRef) public element: ElementRef,
              private groupRepository: GroupRepository,
              private permissionRepository: PermissionRepository,
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

    // this.groupRepository.findAccessGroupPermissionsByUserId(this.entity.id).subscribe(resultFromGroupPermissionRequest => {
    //   this.entity.groupPermissions = resultFromGroupPermissionRequest.content;
    //   this.permissionRepository.listByFilters({branch: true}).subscribe(result => {
    //     this.asdfasda(result.content).then(resultt => {
    //       this.permissions = resultt;
    //       console.log(this.permissions);
    //       if (this.entity.id) {
    //         let permissions = this.entity.groupPermissions.map(a => a.permission);
    //         permissions = this.organize(permissions);
    //         this.organizeTheSelecteds(permissions, this.permissions);
    //
    //         console.log(this.permissions);
    //         this.entity.groupPermissions = [];
    //
    //         for (let i = 0; i < permissions.length; i++) {
    //           if (permissions[i]) {
    //             const groupPermission: GroupPermission = new GroupPermission();
    //
    //             // Remove recursividade
    //             const group: Group = new Group();
    //             group.id = this.entity.id;
    //             group.enable = this.entity.enable;
    //             group.name = this.entity.name;
    //
    //             groupPermission.group = group;
    //             groupPermission.permission = permissions[i];
    //
    //             this.entity.groupPermissions.push(groupPermission)
    //           }
    //         }
    //       }
    //     });
    //   })
    // });
  }

  async asdfasda(permissions: Permission[]) {
    for (let i = 0; i < permissions.length; i++) {
      permissions[i].lowerPermissions = (await this.permissionRepository.listByFilters({upperPermissionId: permissions[i].id}).toPromise()).content;
      if (permissions[i].lowerPermissions && permissions[i].lowerPermissions.length)
        await this.asdfasda(permissions[i].lowerPermissions)
    }
    return permissions;
  }

  /**
   *
   * @param permissions
   */
  organize(permissions: Permission[]): Permission[] {

    for (let i = 0; i < permissions.length; i++) {

      if (permissions[i].upperPermission && (permissions[i].upperPermission as any).id)
        permissions[i].upperPermission = (permissions[i].upperPermission as any).id;

      if (!permissions[i].id)
        permissions[i] = this.findPermission(this.permissions, (permissions[i] as any));
      else if (permissions[i].lowerPermissions)
        permissions[i].lowerPermissions = this.organize(permissions[i].lowerPermissions);
    }

    return permissions
  }

  /**
   * Pesqusia a permissão pelo ID
   * @param ownPermissoes
   * @param allPermissoes
   */
  public organizeTheSelecteds(ownPermissoes: Permission[], allPermissoes: Permission[]): void {
    for (let i = 0; i < allPermissoes.length; i++) {
      const permission: Permission = this.findPermission(ownPermissoes, allPermissoes[i].id);

      if (permission) {
        (permission as any).selected = true;
        allPermissoes[i] = permission;
      } else if (allPermissoes[i].lowerPermissions && allPermissoes[i].lowerPermissions.length)
        this.organizeTheSelecteds(ownPermissoes, allPermissoes[i].lowerPermissions)
    }
  }

  /**
   *
   * @param permissionToAdd
   */
  addPermission(permissionToAdd: Permission) {

    const groupPermission: GroupPermission = new GroupPermission();

    // Remove recursividade
    const group: Group = new Group();
    group.id = this.entity.id;
    group.enable = this.entity.enable;
    group.name = this.entity.name;

    groupPermission.group = group;
    groupPermission.permission = permissionToAdd;

    this.entity.groupPermissions.push(groupPermission);

    const permissionFound = this.findPermission(this.permissions, permissionToAdd.upperPermission);

    if ((permissionToAdd.upperPermission && permissionFound) && permissionFound.lowerPermissions.length === this.entity.groupPermissions.map(gp => gp.permission).filter(p => p.upperPermission === permissionToAdd.upperPermission).length) {

      this.entity.groupPermissions = this.entity.groupPermissions.filter(a => a.permission.upperPermission !== permissionToAdd.upperPermission);

      this.addPermission(this.findPermission(this.permissions, permissionToAdd.upperPermission))

    } else {

      // console.log('Permissões não duplicadas', this.organize(this.entity.groupPermissions.map(a => a.permission)));
      let permissions: Permission[] = this.removeDuplicates(this.organize(this.entity.groupPermissions.map(a => a.permission)));

      // Apenas verificação cautelar
      if (permissions && permissions.length) {
        this.entity.groupPermissions = [];

        permissions.forEach(permission => {
          const groupPermission: GroupPermission = new GroupPermission();

          // Remove recursividade
          const group: Group = new Group();
          group.id = this.entity.id;
          group.enable = this.entity.enable;
          group.name = this.entity.name;

          groupPermission.group = group;
          groupPermission.permission = permission;

          this.entity.groupPermissions.push(groupPermission);
        });
      }

      console.log('--------------------------------------------------------------------------------------------------------------------');
      this.entity.groupPermissions.forEach(a => console.log(a.permission.authority))
    }
  }

  /**
   * Remove os ítens repetidos
   * @param permissionsLineares
   */
  removeDuplicates(permissionsLineares: Permission[]): Permission[] {
    for (let i = 0; i < permissionsLineares.length; i++) {
      for (let k = 0; k < permissionsLineares.length; k++) {
        if (i !== k && permissionsLineares[i] && permissionsLineares[k]) {

          // Se encontrou nos filhos de dentro
          const founded = this.findPermission(permissionsLineares[i].lowerPermissions, permissionsLineares[k].id);
          if (founded) {
            (permissionsLineares[k] as any).toDelete = true;
          }

        }
      }
    }

    // Remove irmãos repetidos
    return permissionsLineares.filter(function (este, i) {
      return permissionsLineares.indexOf(este) === i;
    }).filter(permission => !(permission as any).toDelete);
  }

  /**
   *
   * @param permission
   */
  removePermission(permission: Permission) {

    const permissions: Permission[] = this.runToRemove(permission, this.entity.groupPermissions.map(a => a.permission));

    this.entity.groupPermissions = [];

    for (let i = 0; i < permissions.length; i++) {
      if (permissions[i]) {
        const groupPermission: GroupPermission = new GroupPermission();

        // Remove recursividade
        const group: Group = new Group();
        group.id = this.entity.id;
        group.enable = this.entity.enable;
        group.name = this.entity.name;

        groupPermission.group = group;
        groupPermission.permission = permissions[i];

        this.entity.groupPermissions.push(groupPermission)
      }
    }

    console.log('--------------------------------------------------------------------------------------------------------------------');
    this.entity.groupPermissions.forEach(a => console.log(a.permission.authority))
  }


  /**
   * @param permissionToRemove
   * @param linkedPermissions
   */
  public runToRemove(permissionToRemove: Permission, linkedPermissions: Permission[]): Permission[] {
    for (let i = 0; i < linkedPermissions.length; i++) {
      if (linkedPermissions[i] && permissionToRemove) {
        if (linkedPermissions[i].id === permissionToRemove.id) {
          const copia = linkedPermissions.slice();
          copia.splice(i, 1);
          return copia;
        } else if (linkedPermissions[i].lowerPermissions && linkedPermissions[i].lowerPermissions.length) {

          if (this.findPermission(linkedPermissions[i].lowerPermissions, permissionToRemove.id)) {
            const aux = linkedPermissions.slice();
            aux.splice(i, 1);
            return aux.concat(this.runToRemove(permissionToRemove, linkedPermissions[i].lowerPermissions));
          }

        }
      }
    }
    return linkedPermissions;
  }

  /**
   * Pesqusia a permissão pelo ID
   * @param permissions
   * @param id
   */
  public findPermission(permissions: Permission[], id: number): Permission {
    for (let i = 0; i < permissions.length; i++) {
      if (permissions[i]) {
        if (permissions[i].id === id)
          return permissions[i];
        else if (permissions[i].lowerPermissions && permissions[i].lowerPermissions.length) {
          const permission: Permission = this.findPermission(permissions[i].lowerPermissions, id);
          if (permission)
            return permission;
        }
      }
    }
  }
}
