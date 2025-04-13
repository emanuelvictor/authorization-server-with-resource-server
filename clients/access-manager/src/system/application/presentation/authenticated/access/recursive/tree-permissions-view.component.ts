import {Component, Input, OnInit} from '@angular/core';
import {PermissionRepository} from "../../../../../domain/repository/permission.repository";
import {Permission} from "../../../../../domain/entity/permission.model";
import {Group} from "../../../../../domain/entity/group.model";
import {GroupPermission} from "../../../../../domain/entity/group-permission.model";
import {AccessGroupPermissionRepository} from "../../../../../domain/repository/accessGroupPermission.repository";

// @ts-ignore
@Component({
  selector: 'tree-permissions-view',
  templateUrl: './tree-permissions-view.component.html',
  styleUrls: ['./tree-permissions-view.component.scss']
})
export class TreePermissionsViewComponent implements OnInit {

  private permissionRepository: PermissionRepository;
  private accessGroupPermissionRepository: AccessGroupPermissionRepository;

  expanded: boolean = false;

  hasChildren: boolean = false;

  @Input() readOnly: boolean = false;

  @Input() group: Group = new Group();

  @Input() upperPermission: Permission = new Permission();

  constructor(permissionRepository: PermissionRepository,
              accessGroupPermissionRepository: AccessGroupPermissionRepository) {
    this.permissionRepository = permissionRepository;
    this.accessGroupPermissionRepository = accessGroupPermissionRepository;
  }

  ngOnInit(): void {
    this.verifyIfThePermissionHasChildren(this.upperPermission).then(hasChildren => {
      this.hasChildren = hasChildren
    })
    if (!this.upperPermission.checked)
      this.verifyIfThePermissionIsLinkedToGroup(this.group, this.upperPermission)
        .then(isPermissionLinkedToGroup => {
          if (isPermissionLinkedToGroup) {
            this.upperPermission.checked = true;
            this.upperPermission.indeterminate = false;
          } else {
            this.verifyIfThePermissionHasSomeChildLinked(this.group, this.upperPermission)
              .then(countOfLinkedPermissions => {
                this.upperPermission.checked = false;
                this.upperPermission.indeterminate = countOfLinkedPermissions > 0
              });
          }
        });
  }

  async verifyIfThePermissionHasChildren(permission: Permission) {
    const pageable = {
      'upperPermissionId': permission.id
    }
    return (await this.permissionRepository.listByFilters(pageable).toPromise()).content.length > 0;
  }

  async verifyIfThePermissionHasSomeChildLinked(accessGroup: Group, permissionToSearch: Permission) {
    if (permissionToSearch && !permissionToSearch.indeterminate && !permissionToSearch.checked) {
      const authority = permissionToSearch && permissionToSearch.authority ? permissionToSearch.authority : 'root';
      return await this.accessGroupPermissionRepository.verifyIfThePermissionHasSomeChildLinked(accessGroup.id, authority);
    } else return 0;
  }

  async verifyIfThePermissionIsLinkedToGroup(accessGroup: Group, permission: Permission) {
    const pageable = {
      'groupId': accessGroup.id,
      'authority': permission.authority
    }
    return (await this.accessGroupPermissionRepository.listByFilters(pageable).toPromise()).content.length > 0
  }

  areTheLowersPermissionsChecked(permission: Permission) {
    if (permission) {
      const contOfLowerPermissionChecked = permission.lowerPermissions.filter(value => value.checked).length;
      if (permission.lowerPermissions && contOfLowerPermissionChecked === permission.lowerPermissions.length) {
        permission.checked = true;
        permission.indeterminate = false;
      } else if (permission.lowerPermissions && contOfLowerPermissionChecked !== permission.lowerPermissions.length) {
        permission.checked = false;
        if (contOfLowerPermissionChecked > 0)
          permission.indeterminate = true;
        else permission.indeterminate = permission.lowerPermissions.filter(value => value.indeterminate).length > 0;
      }
      this.areTheLowersPermissionsChecked(permission.upperPermission)
    }
  }

  clickAtPermissionName(permission: Permission) {
    if (this.expanded)
      this.expanded = false;
    else {
      this.loadLowerPermissions(permission)
      this.expanded = true;
    }
  }

  loadLowerPermissions(upperPermission: Permission) {
    if (!upperPermission.lowerPermissions)
      this.permissionRepository.listByFilters({upperPermissionId: upperPermission.id})
        .subscribe(result => {
          this.upperPermission.lowerPermissions = result.content;
          this.upperPermission.lowerPermissions.forEach(permission => permission.upperPermission = upperPermission);
          this.setChecked(upperPermission, upperPermission.checked);
        })
  }

  setChecked(permission: Permission, checked: boolean) {
    permission.checked = checked
    if (permission.lowerPermissions != null)
      permission.lowerPermissions.forEach(lowerPermission => (this.setChecked(lowerPermission, checked)))
  }

  setCheckedAndSave(permission: Permission, checked: boolean) {
    const group: Group = new Group(this.group.id);
    const permissionToSave: Permission = new Permission(permission.authority);
    const accessGroupPermission: GroupPermission = new GroupPermission(permissionToSave, group);
    if (checked) {
      this.accessGroupPermissionRepository.save(accessGroupPermission).then(() => {
        console.log('Linked authority ' + permission.authority + ' to group ' + group.id);
      })
    } else {
      this.accessGroupPermissionRepository.remove(accessGroupPermission).then(() => {
        console.log('Unlinked authority ' + permission.authority + ' from group ' + group.id);
      })
    }
    permission.checked = checked
    if (permission.lowerPermissions != null)
      permission.lowerPermissions.forEach(lowerPermission => (this.setChecked(lowerPermission, checked)))
    this.areTheLowersPermissionsChecked(permission.upperPermission)
  }
}
