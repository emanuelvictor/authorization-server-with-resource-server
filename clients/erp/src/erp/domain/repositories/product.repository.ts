import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/product";
import { BaseRepository } from '../../../common/domain/repository/repository/base/base.repository';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'api/stocks/products');
  }
}
