import {User} from "../../../../erp/domain/model/user";

export class Access extends User {

  public access_token?: string;
  public expires_in?: number;
  public date_to_expire?: Date;
  public integrator: any; // TODO
  public refresh_token?: string;
  public scope: any;
  public token_type: any;


  public constructor(access?: Access) {
    super(access?.id);
    if (access) {
      this.refresh_token = access.refresh_token;
      this.access_token = access.access_token;
      this.expires_in = access.expires_in;
      this.date_to_expire = new Date();
      this.date_to_expire = this.expires_in ? new Date(this.date_to_expire.getTime() + (this.expires_in * 1000)) : undefined;
      this.integrator = access.integrator;
      this.scope = access.scope;
      this.token_type = access.token_type;
      this.name = access.name;
      this.id = access.id;
    }
  }

  isInvalidAccessToken(): boolean {
    return this.date_to_expire ? Access.isDateBeforeToday(this.date_to_expire) : true
  }

  private static isDateBeforeToday(date: Date): boolean {
    return date < new Date();
  }
}
