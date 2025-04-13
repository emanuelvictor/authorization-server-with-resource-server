import {Abstract} from "./abstract/abstract.model";
import {GroupPermission} from "./group-permission.model";
import {name} from "moment";

export class Group extends Abstract {

  /**
   *
   */
  public name: string;

  /**
   *
   */
  public enable: boolean;

  /**
   *
   */
  public groupPermissions: GroupPermission[];


  constructor(id?: number) {
    super();
    this.id = id;
  }
}
