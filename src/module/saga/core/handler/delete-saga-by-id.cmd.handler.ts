import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { CLIENTS, Saga_Deleted } from 'src/constant';
import { ISagaRepository } from '../../domain/saga.interface';
import { DeleteSagaByIdCommand } from '../command/delete-saga-by-id.cmd';

@CommandHandler(DeleteSagaByIdCommand)
export class DeleteSagaByIdHandler
  implements ICommandHandler<DeleteSagaByIdCommand>
{
  constructor(
    @Inject('ISagaRepository') private readonly sagaRepository: ISagaRepository,
    @Inject(CLIENTS.Search_Client) private readonly searchService: ClientProxy,
  ) {}

  async execute(command: DeleteSagaByIdCommand): Promise<any> {
    const id = command.id;

    const isSuccess = await this.sagaRepository.deleteById(id);
    this.searchService.send(Saga_Deleted, { id }).subscribe();
    return isSuccess;
  }
}
