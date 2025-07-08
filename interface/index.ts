import { PagingRequestDTO } from "core";

export interface IQueryRepository<T, K = string> {
    findById(id: K): Promise<T | null>;
    findOne(cond: Record<string, any>): Promise<T | null>;
    findMany(cond: Record<string, any>, paging?: PagingRequestDTO): Promise<T[]>;
}

export interface ICommandRepository<T, K = string> {
    insert(data: T): Promise<boolean>;
    insertMany(data: T[]): Promise<boolean>;
    updateById(id: K, data: Record<string, any>): Promise<boolean>;
    updateOne(cond: Record<string, any>, data: Record<string, any>): Promise<boolean>;
    updateMany(cond: Record<string, any>, data: Record<string, any>): Promise<boolean>;
    deleteById(id: K): Promise<boolean>;
    deleteOne(cond: Record<string, any>): Promise<boolean>;
    deleteMany(cond: Record<string, any>): Promise<boolean>;
}

export interface IRepository<T, K = string>
    extends IQueryRepository<T, K>,
        ICommandRepository<T, K> {}
