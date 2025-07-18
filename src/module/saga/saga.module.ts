import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitmqModule } from '../rabbitmq';
import { SAGA_HANDLERS } from './core';
import { SagaSchema, SagaService } from './domain';
import { SagaRepository } from './infras/saga.repository';

@Module({
  imports: [
    CqrsModule,
    RabbitmqModule,
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
