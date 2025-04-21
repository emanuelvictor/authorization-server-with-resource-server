import {Abstract} from "./abstract/abstract.model";
import {GroupPermission} from "./group-permission.model";

export class Product extends Abstract {

  public name: string;

  constructor(id?: number) {
    super();
    this.id = id;
  }
}
