import { Model } from 'mongoose';
import { IRepository } from '../../interface';
import { PagingRequestDTO } from 'src/dto';

export abstract class MongoRepository<TEntity, TPersistence extends Document>
  implements IRepository<TEntity>
{
  constructor(protected readonly model: Model<TPersistence>) {}

  abstract toDomain(doc: TPersistence): TEntity;
  abstract fromDomain(domain: TEntity): TPersistence;

  async findById(id: string): Promise<TEntity | null> {
    const doc = await this.model.findById(id);

    return doc ? this.toDomain(doc) : null;
  }

  async findOne(cond: Record<string, any>): Promise<any> {
    const doc = await this.model.findOne(cond);

    return doc ? this.toDomain(doc) : null;
  }

  async findMany(
    cond: Record<string, any>,
    paging?: PagingRequestDTO,
  ): Promise<TEntity[]> {
    const query = this.model.find(cond);

    if (paging) {
      const { page, limit } = paging;
      query.skip((page - 1) * limit).limit(limit);
    }

    const docs = await query.exec();
    return docs.map((doc) => this.toDomain(doc));
  }

  async insert(data: TEntity): Promise<boolean> {
    if (this.fromDomain === undefined) {
      throw new Error('fromDomain have not implemented yet');
    }

    const insertDoc = this.fromDomain(data);
    try {
      await this.model.insertOne(insertDoc);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async insertMany(data: TEntity[]): Promise<boolean> {
    try {
      await this.model.insertMany(data);
      return true;
    } catch (error) {
      return false;
    }
  }

  async updateById(id: string, data: Record<string, any>): Promise<boolean> {
    try {
      await this.model.findByIdAndUpdate(id, data);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async updateOne(
    cond: Record<string, any>,
    data: Record<string, any>,
  ): Promise<boolean> {
    try {
      await this.model.updateOne(cond, data);
      return true;
    } catch (error) {
      return false;
    }
  }

  async updateMany(
    cond: Record<string, any>,
    data: Record<string, any>,
  ): Promise<boolean> {
    try {
      await this.model.updateMany(cond, data);
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteById(id: string): Promise<boolean> {
    try {
      await this.model.findByIdAndDelete(id);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(cond: Record<string, any>): Promise<boolean> {
    try {
      await this.model.deleteOne(cond);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async deleteMany(cond: Record<string, any>): Promise<boolean> {
    try {
      await this.model.deleteMany(cond);
      return true;
    } catch (error) {
      return false;
    }
  }
}
