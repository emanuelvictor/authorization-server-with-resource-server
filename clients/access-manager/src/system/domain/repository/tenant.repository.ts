import {Injectable} from '@angular/core';
import {BaseRepository} from "../../infrastructure/repository/base/base.repository";
import {HttpClient} from "@angular/common/http";
import {Group} from "../entity/group.model";
import {Tenant} from "../entity/tenant.model";

@Injectable()
export class TenantRepository extends BaseRepository<Tenant> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'api/access-manager/tenants');
  }

  // link(groupId: number, authority: string) {
  //   const body = {'authority': authority};
  //   return this.httpClient.put<any>(this.collectionName + '/' + groupId + '/link', authority).toPromise();
  // }
  //
  // unlink(groupId: number, authority: string) {
  //   return this.httpClient.delete(this.collectionName + '/' + groupId + '/unlink/' + authority).toPromise();
  // }
}
