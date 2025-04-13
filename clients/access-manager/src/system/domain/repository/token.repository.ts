import {Injectable} from '@angular/core';
import {BaseRepository} from "../../infrastructure/repository/base/base.repository";
import {HttpClient} from "@angular/common/http";
import {Token} from "../entity/token.model";
import {environment} from "../../../environments/environment";

@Injectable()
export class TokenRepository extends BaseRepository<Token> {

  /**
   *
   * @param httpClient
   */
  constructor(httpClient: HttpClient) {
    super(httpClient, 'access-manager/tokens');
  }

  /**
   *
   * @param id
   */
  listTokensById(id: any): any {
    return this.httpClient.get<any>(this.collectionName + '/' + id)
  }

  /**
   *
   * @param token
   */
  revoke(token: string): Promise<void> {
    return this.httpClient.delete<void>(environment.api + '/auth-engine/tokens/' + token).toPromise()
  }
}
