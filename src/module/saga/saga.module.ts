import { Module } from '@nestjs/common';
import { SAGA_HANDLERS } from './core';
import { SagaRepository } from './infras/saga.repository';
import { SagaController } from './infras/saga.transport';

@Module({
  controllers: [SagaController],
  providers: [
    {
      provide: 'ISagaRepository',
      useClass: SagaRepository,
    },
    ...SAGA_HANDLERS,
  ],
})
export class SagaModule {}
