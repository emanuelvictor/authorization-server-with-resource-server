export interface IWrite<T > {

  save(item: T): Promise<T | undefined>;

  update(id: number, item: T): Promise<T | undefined>;

  delete(id: number): Promise<void>;
}
