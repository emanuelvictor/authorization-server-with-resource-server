import {Observable} from 'rxjs';

export interface IRead<T> {

  findById(id: number): Observable<T>;

  listByFilters(filters: any): Observable<T[]>;

  findAll(): Observable<T[]>
}
