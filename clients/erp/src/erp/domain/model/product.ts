import { Abstract } from "../../../common/domain/model/abstract";

export class Product extends Abstract {

  public name?: string;

  constructor(id?: number) {
    super();
    this.id = id;
  }
}
