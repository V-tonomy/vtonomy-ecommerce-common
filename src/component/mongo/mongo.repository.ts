import { Model } from 'mongoose';
import { PagingRequestDTO } from 'src/dto';
import { IRepository } from '../../interface';

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
      const docs = data.map((item) => this.fromDomain(item));
      await this.model.insertMany(docs);
      return true;
    } catch (error) {
      console.log("🚀 ~ insertMany ~ error:", error)
      throw error
    }
  }

  async updateById(id: string, data: Record<string, any>): Promise<boolean> {
    try {
      const result = await this.model.updateOne({ _id: id }, { $set: data });
      return result.matchedCount > 0;
    } catch (error) {
      console.error('updateById error:', error);
      throw error;
    }
  }

  async updateOne(
    cond: Record<string, any>,
    data: Record<string, any>,
  ): Promise<boolean> {
    try {
      const result = await this.model.updateOne(cond, { $set: data });
      return result.matchedCount > 0;
    } catch (error) {
      console.error('updateOne error:', error);
      throw error;
    }
  }

  async updateMany(
    cond: Record<string, any>,
    data: Record<string, any>,
  ): Promise<number> {
    try {
      const result = await this.model.updateMany(cond, { $set: data });
      return result.modifiedCount;
    } catch (error) {
      console.error('updateMany error:', error);
      throw error;
    }
  }

  async deleteById(id: string): Promise<boolean> {
    try {
      const result = await this.model.deleteOne({ _id: id });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('deleteById error:', error);
      throw error;
    }
  }

  async deleteOne(cond: Record<string, any>): Promise<boolean> {
    try {
      const result = await this.model.deleteOne(cond);
      return result.deletedCount > 0;
    } catch (error) {
      console.error('deleteOne error:', error);
      throw error;
    }
  }

  async deleteMany(cond: Record<string, any>): Promise<number> {
    try {
      const result = await this.model.deleteMany(cond);
      return result.deletedCount;
    } catch (error) {
      console.error('deleteMany error:', error);
      throw error;
    }
  }
}
