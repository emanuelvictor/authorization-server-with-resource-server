import {User} from "../../domain/entity/user.model";

export class Access extends User {

  private _access_token: string;
  private _expires_in: number;
  private _date_to_expire: Date;
  private _integrator: any; // TODO
  private _refresh_token: string;
  private _scope: any;
  private _token_type: any;

  /**
   *
   * @param access
   */
  public constructor(access?: Access) {
    super(access.id);
    if (access) {
      this.refresh_token = access.refresh_token;
      this.access_token = access.access_token;
      this.expires_in = access.expires_in;
      this._date_to_expire = new Date();
      this._date_to_expire = new Date(this._date_to_expire.getTime() + (this.expires_in * 1000));
      this.integrator = access.integrator;
      this.scope = access.scope;
      this.token_type = access.token_type;
      this.name = access.name;
      this.id = access.id;
    }
  }

  get refresh_token(): string {
    return this._refresh_token;
  }

  set refresh_token(value: string) {
    this._refresh_token = value;
  }

  get access_token(): string {
    return this._access_token;
  }

  set access_token(value: string) {
    this._access_token = value;
  }

  get expires_in(): number {
    return this._expires_in;
  }

  set expires_in(value: number) {
    this._expires_in = value;
  }

  get integrator(): any {
    return this._integrator;
  }

  set integrator(value: any) {
    this._integrator = value;
  }

  get scope(): any {
    return this._scope;
  }

  set scope(value: any) {
    this._scope = value;
  }

  get token_type(): any {
    return this._token_type;
  }

  set token_type(value: any) {
    this._token_type = value;
  }

  get isInvalidAccessToken(): boolean {
    return Access.isDateBeforeToday(this._date_to_expire)
  }

  private static isDateBeforeToday(date: Date): boolean {
    return date < new Date();
  }
}
