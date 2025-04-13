import {People} from './people.model';
import {Group} from "./group.model";
import {ClientDetails} from "../../infrastructure/authentication/client-details";

export class Application extends People implements ClientDetails {

  /**
   *
   */
  public clientId: string;

  /**
   *
   */
  public clientSecret: string;

  /**
   *
   */
  public enabled: boolean = true;

  /**
   *
   */
  public group: Group;

  /**
   *
   */
  public authorities: any;

  /**
   *
   */
  constructor(id?: number) {
    super();
    this.id = id;
  }

}
