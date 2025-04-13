import {People} from './people.model';
import {UserDetails} from "../../infrastructure/authentication/user-details";
import {Group} from "./group.model";

export class Token {

  /**
   *
   */
  public value: string;

  /**
   *
   */
  public name: string;


  /**
   *
   */
  public createdOn: Date;

}
