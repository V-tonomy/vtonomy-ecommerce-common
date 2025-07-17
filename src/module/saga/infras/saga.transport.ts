import {
    Controller
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
    Ctx,
    MessagePattern,
    Payload,
    RmqContext,
} from '@nestjs/microservices';
import { Saga_Created, Saga_Deleted, Saga_Updated } from 'src/constant';
import {
    CreateSagaCommand,
    CreateSagaDTO,
    UpdateSagaByIdCommand,
} from '../core';
import { DeleteSagaByIdCommand } from '../core/command/delete-saga-by-id.cmd';

@Controller('saga')
export class SagaController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @MessagePattern(Saga_Created)
  async handleSagaCreated(
    @Payload() data: CreateSagaDTO,
    @Ctx() context: RmqContext,
  ) {
    await this.commandBus.execute(CreateSagaCommand.create(data));
  }

  @MessagePattern(Saga_Updated)
  async handleSagaUpdated(@Payload() data: any, @Ctx() context: RmqContext) {
    const { id, props } = data;
    await this.commandBus.execute(UpdateSagaByIdCommand.create(id, props));
  }

  @MessagePattern(Saga_Deleted)
  async handleSagaDeleted(@Payload() data: any, @Ctx() context: RmqContext) {
    const { id } = data;
    await this.commandBus.execute(DeleteSagaByIdCommand.create(id));
  }
}
