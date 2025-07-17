import { IRepository } from 'src/interface';

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

export interface ISagaRepository extends IRepository<ISaga, ISagaPersistant> {}
