import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { SAGA_HANDLERS } from './core';
import { SagaSchema } from './domain';
import { SagaService } from './domain/saga.service';
import { SagaRepository } from './infras/saga.repository';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forRoot(
      process.env.MONGODB_URL ?? 'mongodb://localhost:27017/ecommerce',
    ),
    MongooseModule.forFeature([{ name: 'Saga', schema: SagaSchema }]),
  ],
  providers: [
    {
      provide: 'ISagaRepository',
      useClass: SagaRepository,
    },
    {
      provide: 'ISagaService',
      useClass: SagaService,
    },
    ...SAGA_HANDLERS,
  ],
  exports: ['ISagaService'],
})
export class SagaModule {}
