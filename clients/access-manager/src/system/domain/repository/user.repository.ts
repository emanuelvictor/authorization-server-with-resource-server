import {Injectable} from '@angular/core';
import {BaseRepository} from "../../infrastructure/repository/base/base.repository";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PageSerialize} from "../../infrastructure/page-serialize/page-serialize";
import {Observable} from "rxjs";
import {User} from "../entity/user.model";

@Injectable()
export class UserRepository extends BaseRepository<User> {

  /**
   *
   * @param httpClient
   */
  constructor(httpClient: HttpClient) {
    super(httpClient, 'api/access-manager/users');
  }

  /**
   *
   * @param username
   */
  findByLdapUsername(username: string): any {
    const params = PageSerialize.getHttpParamsFromPageable({username: username});

    return this.httpClient.get<any>(this.collectionName + '/ldap', {
      params: params
    })
  }

  /**
   *
   * @param {User} user
   * @param {string} newPassword
   * @returns {Observable<{}>}
   */
  public changePassword(user: User, newPassword: string): Promise<User> {
    user.password = newPassword;

    const params: HttpParams = new HttpParams().set('newPassword', newPassword);

    return this.httpClient.get<User>(this.collectionName + '/' + user.id + '/change-password', {
      params: params
    }).toPromise();
  }

  /**
   *
   * @param id
   * @param actualPassword
   * @param newPassword
   */
  public updatePassword(id: number, actualPassword: any, newPassword: any): Promise<any> {
    let params = new HttpParams();
    params = params.set('actualPassword', actualPassword);
    params = params.set('newPassword', newPassword);

    return this.httpClient.put(`${this.collectionName}/update-password/${id}`, params).toPromise();
  }

}
