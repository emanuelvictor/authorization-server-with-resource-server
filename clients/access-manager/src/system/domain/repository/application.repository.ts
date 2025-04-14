import {Injectable} from '@angular/core';
import {BaseRepository} from "../../infrastructure/repository/base/base.repository";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Application} from "../entity/application.model";

@Injectable()
export class ApplicationRepository extends BaseRepository<Application> {

  /**
   *
   * @param httpClient
   */
  constructor(httpClient: HttpClient) {
    super(httpClient, 'api/access-manager/applications');
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


  /**
   *
   * @param {Application} application
   * @param {string} newPassword
   * @returns {Observable<{}>}
   */
  public changePassword(application: Application, newPassword: string): Promise<Application> {
    application.clientSecret = newPassword;

    const params: HttpParams = new HttpParams().set('newPassword', newPassword);

    return this.httpClient.get<Application>(this.collectionName + '/' + application.id + '/change-password', {
      params: params
    }).toPromise();
  }
}
