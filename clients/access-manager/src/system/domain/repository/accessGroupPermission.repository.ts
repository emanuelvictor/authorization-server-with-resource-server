import {Injectable} from '@angular/core';
import {BaseRepository} from "../../infrastructure/repository/base/base.repository";
import {HttpClient} from "@angular/common/http";
import {GroupPermission} from "../entity/group-permission.model";

@Injectable()
export class AccessGroupPermissionRepository extends BaseRepository<GroupPermission> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'access-manager/v1/access-group-permissions');
  }

  save(accessGroupPermission: GroupPermission) {
    return this.httpClient.post<any>(this.collectionName, accessGroupPermission).toPromise();
  }

  remove(accessGroupPermission: GroupPermission) {
    return this.httpClient.delete(this.collectionName + '/' + accessGroupPermission.group.id + '/' + accessGroupPermission.permission.authority).toPromise();
  }

  verifyIfThePermissionHasSomeChildLinked(accessGroupId: number, authority: string) {
    return this.httpClient.get(this.collectionName + '/' + accessGroupId + '/' + authority).toPromise();
  }
}
