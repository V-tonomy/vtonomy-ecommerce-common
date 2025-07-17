import { ICommand } from '@nestjs/cqrs';
import { CreateSagaDTO } from '../dto';

export class CreateSagaCommand implements ICommand {
  props: CreateSagaDTO;
  constructor(props: CreateSagaDTO) {
    this.props = props;
  }

  static create(props: CreateSagaDTO) {
    return new CreateSagaCommand(props);
  }
}
