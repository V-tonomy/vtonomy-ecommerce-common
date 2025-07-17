import { ICommand } from '@nestjs/cqrs';

export class DeleteSagaByIdCommand implements ICommand {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  static create(id: string) {
    return new DeleteSagaByIdCommand(id);
  }
}
