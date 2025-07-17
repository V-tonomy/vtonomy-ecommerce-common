import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SAGA_HANDLERS } from './core';
import { SagaSchema } from './domain';
import { SagaService } from './domain/saga.service';
import { SagaRepository } from './infras/saga.repository';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URL ?? 'mongodb://localhost:27017/ecommerce',
    ),
    MongooseModule.forFeature([{ name: 'User', schema: SagaSchema }]),
  ],
  controllers: [],
  providers: [
    {
      provide: 'ISagaRepository',
      useClass: SagaRepository,
    },
    ...SAGA_HANDLERS,
    SagaService,
  ],
  exports: [SagaService],
})
export class SagaModule {}
