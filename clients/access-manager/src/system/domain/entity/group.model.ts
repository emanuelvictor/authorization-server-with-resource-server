import {Abstract} from "./abstract/abstract.model";
import {GroupPermission} from "./group-permission.model";

export class Group extends Abstract {

  public name: string;
  public internal: boolean = false;
  public groupPermissions: GroupPermission[];

  constructor(id?: number) {
    super();
    this.id = id;
  }
}
