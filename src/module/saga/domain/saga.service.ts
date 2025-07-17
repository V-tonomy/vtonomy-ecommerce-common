import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
    CreateSagaCommand,
    CreateSagaDTO,
    UpdateSagaByIdCommand,
    UpdateSagaDTO,
} from '../core';
import { DeleteSagaByIdCommand } from '../core/command/delete-saga-by-id.cmd';
import { ISagaService } from './saga.interface';

@Injectable()
export class SagaService implements ISagaService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  async insert(data: CreateSagaDTO) {
    await this.commandBus.execute(CreateSagaCommand.create(data));
  }

  async updateById(id: string, data: UpdateSagaDTO) {
    await this.commandBus.execute(UpdateSagaByIdCommand.create(id, data));
  }

  async deleteById(id: string) {
    await this.commandBus.execute(DeleteSagaByIdCommand.create(id));
  }
}
