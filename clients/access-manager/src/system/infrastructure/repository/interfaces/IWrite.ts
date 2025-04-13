export interface IWrite<T> {

  save(item: T): Promise<T>;

  update(id: number, item: T): Promise<T>;

  delete(id: number): Promise<void>;
}
