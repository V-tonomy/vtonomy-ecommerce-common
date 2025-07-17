import { ICommand } from '@nestjs/cqrs';
import { UpdateSagaDTO } from '../dto';

export class UpdateSagaByIdCommand implements ICommand {
  id: string;
  props: UpdateSagaDTO;

  constructor(id: string, props: UpdateSagaDTO) {
    this.id = id;
    this.props = props;
  }

  static create(id: string, props: UpdateSagaDTO) {
    return new UpdateSagaByIdCommand(id, props);
  }
}
