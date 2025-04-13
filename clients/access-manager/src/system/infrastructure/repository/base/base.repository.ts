import { IWrite } from '../interfaces/IWrite';
import { IRead } from '../interfaces/IRead';
import { HttpClient } from '@angular/common/http';
import { PageSerialize } from '../../page-serialize/page-serialize';
import { Observable } from 'rxjs';
import { environment } from "../../../../environments/environment";


export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {

  public collectionName: string = environment.api + '/';

  constructor(public httpClient: HttpClient, public collection: string) {
    if (collection)
      this.collectionName = this.collectionName + collection;
    else
      this.collectionName = this.collectionName + this.constructor.name.replace('Repository', '').toLowerCase() + 's';
  }

  async save(item: T): Promise<T> {
    const aux: any = item;
    if (aux.id)
      return this.update(aux.id, item);
    return this.httpClient.post<T>(this.collectionName, item).toPromise();
  }

  update(id: number, item: T): Promise<T> {
    return this.httpClient.put<T>(this.collectionName + '/' + id, item).toPromise();
  }

  delete(id: number): Promise<void> {
    return this.httpClient.delete<void>(this.collectionName + '/' + id).toPromise();
  }

  findById(id: number): Observable<T> {
    return this.httpClient.get<T>(this.collectionName + '/' + id);
  }

  listByFilters(pageable: any): Observable<any> {

    const params = PageSerialize.getHttpParamsFromPageable(pageable);

    return this.httpClient.get(this.collectionName, {
      params: params
    })

  }

  findAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.collectionName);
  }

  updateEnable(id: number): Promise<boolean> {
    return this.httpClient.put<boolean>(this.collectionName + '/enable', id).toPromise();
  }

}
