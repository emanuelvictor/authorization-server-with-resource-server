import {Injectable} from '@angular/core';
import {BaseRepository} from "../../infrastructure/repository/base/base.repository";
import {HttpClient} from "@angular/common/http";
import {Group} from "../entity/group.model";

@Injectable()
export class GroupRepository extends BaseRepository<Group> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'access-manager/v1/groups');
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
