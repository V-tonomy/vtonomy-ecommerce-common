import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { CLIENTS, Saga_Created } from 'src/constant';
import { Saga } from '../../domain/saga.entity';
import { ISagaRepository } from '../../domain/saga.interface';
import { CreateSagaCommand } from '../command';

@CommandHandler(CreateSagaCommand)
export class CreateSagaHandler implements ICommandHandler<CreateSagaCommand> {
  constructor(
    @Inject('ISagaRepository') private readonly sagaRepository: ISagaRepository,
    @Inject(CLIENTS.Search_Client) private readonly searchService: ClientProxy,
  ) {}

  async execute(command: CreateSagaCommand): Promise<string> {
    const { status, step, type, meta } = command.props;
    const id = randomUUID();

    const newSaga = new Saga(
      id,
      type,
      step,
      status,
      meta,
      new Date(),
      new Date(),
    );

    await this.sagaRepository.insert(newSaga);
    this.searchService.send(Saga_Created, newSaga).subscribe();
    return id;
  }
}
