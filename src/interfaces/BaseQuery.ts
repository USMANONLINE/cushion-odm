export interface BaseQuery<T> {
    create: (doc: T) => Promise<T | unknown>;
    // update: (doc: T) => T;
    // delete: (doc: T) => T;
    findById: (docId: string) => Promise<T | unknown>;
    findAll: () => Promise<Array<T> | unknown>;
    // deleteById: (docId: string) => T;
}