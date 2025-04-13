import {Abstract} from "./abstract/abstract.model";
import {Permission} from "./permission.model";
import {Group} from "./group.model";
import {group} from "@angular/animations";

export class GroupPermission extends Abstract {

  public permission: Permission;

  public group: Group;

  constructor(permission?: Permission, group?: Group) {
    super();
    this.permission = permission;
    this.group = group;
  }
}
