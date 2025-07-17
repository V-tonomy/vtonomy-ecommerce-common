import { IRepository } from 'src/interface';

export interface ISaga {
  id: string;
  type: string;
  step: string;
  status: string;
  meta: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISagaPersistant {}

export interface ISagaService {
  insert(data: any): Promise<any>;
  updateById(id: string, data: any): Promise<any>;
  deleteById(id: string): Promise<any>;
}

export interface ISagaRepository extends IRepository<ISaga, ISagaPersistant> {}
