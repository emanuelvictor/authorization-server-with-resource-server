// import {Group} from "./group.model";
// import {Tenant} from "./tenant.model";
import { Person } from './person';
import { UserDetails } from "../../../common/domain/model/user-details";

export class User extends Person implements UserDetails {

  public email?: string;
  public password?: string;
  public internal: boolean = false;
  public enable: boolean = true;
  // public group: Group;
  public root: boolean = false;
  public username?: string;
  public authorities: any;
  // public tenant: Tenant;

  constructor(id?: number) {
    super();
    if (id)
      this.id = id;
    else
      this.root = false;
  }

  get isRoot(): boolean {
    return this.root;
  }

}
