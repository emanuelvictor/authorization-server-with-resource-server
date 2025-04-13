import {Injectable} from '@angular/core';
import {BaseRepository} from "../../infrastructure/repository/base/base.repository";
import {HttpClient} from "@angular/common/http";
import {GroupPermission} from "../entity/group-permission.model";

@Injectable()
export class TestRepository extends BaseRepository<any> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'test/v1');
  }

  get(path?: string) {
    return this.httpClient.get<any>(this.collectionName + path);
  }
}
