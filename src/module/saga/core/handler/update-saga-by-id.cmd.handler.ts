import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { CLIENTS, Saga_Updated } from 'src/constant';
import { ISagaRepository } from '../../domain/saga.interface';
import { UpdateSagaByIdCommand } from '../command';

@CommandHandler(UpdateSagaByIdCommand)
export class UpdateSagaByIdHandler
  implements ICommandHandler<UpdateSagaByIdCommand>
{
  constructor(
    @Inject('ISagaRepository') private readonly sagaRepository: ISagaRepository,
    @Inject(CLIENTS.Search_Client) private readonly searchService: ClientProxy,
  ) {}

  async execute(command: UpdateSagaByIdCommand): Promise<any> {
    const props = command.props;
    const id = command.id;

    const existed = await this.sagaRepository.findById(id);
    if (!existed) {
      throw new NotFoundException(`Saga with id: '${id}' does not exist`);
    }

    const isSuccess = await this.sagaRepository.updateById(id, props);
    this.searchService.send(Saga_Updated, { id, props }).subscribe();
    return isSuccess;
  }
}
