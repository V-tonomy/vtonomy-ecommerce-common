import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  exports: [CqrsModule],
  providers: [],
})
export class CoreModule {}
