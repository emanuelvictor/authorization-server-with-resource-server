import {Injectable} from '@angular/core';
import {BaseRepository} from "../../infrastructure/repository/base/base.repository";
import {HttpClient} from "@angular/common/http";
import {Permission} from "../entity/permission.model";

@Injectable()
export class PermissionRepository extends BaseRepository<Permission> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'api/access-manager/permissions');
  }
}
