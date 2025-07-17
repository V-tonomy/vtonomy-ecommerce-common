import { IRepository } from 'src/interface';
import { CreateSagaDTO, UpdateSagaDTO } from '../core';

export interface ISaga {
  id: string;
  type: string;
  step: string;
  status: string;
  meta: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISagaPersistant {}

export interface ISagaService {
  insert(data: CreateSagaDTO): Promise<any>;
  updateById(id: string, data: UpdateSagaDTO): Promise<any>;
  deleteById(id: string): Promise<any>;
}

export interface ISagaRepository extends IRepository<ISaga, ISagaPersistant> {}
