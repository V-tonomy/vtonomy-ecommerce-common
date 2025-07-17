import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/component';
import { Saga, SagaDocument } from '../domain';

@Injectable()
export class SagaRepository extends MongoRepository<Saga, SagaDocument> {
  constructor(
    @InjectModel('Saga')
    model: Model<SagaDocument>,
  ) {
    super(model);
  }

  toDomain(doc: SagaDocument): Saga {
    return new Saga(
      doc._id,
      doc.type,
      doc.step,
      doc.status,
      doc.meta,
      doc.createdAt,
      doc.updatedAt,
    );
  }

  fromDomain(domain: Saga): SagaDocument {
    return new this.model({
      _id: domain.id,
      type: domain.type,
      step: domain.step,
      status: domain.status,
      meta: domain.meta,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    });
  }
}
