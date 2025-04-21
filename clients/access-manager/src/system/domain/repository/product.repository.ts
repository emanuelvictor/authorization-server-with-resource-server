import {Injectable} from '@angular/core';
import {BaseRepository} from "../../infrastructure/repository/base/base.repository";
import {HttpClient} from "@angular/common/http";
import {Product} from "../entity/product.model";

@Injectable()
export class ProductRepository extends BaseRepository<Product> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'api/stocks/products');
  }
}
