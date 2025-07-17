import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ESagaStatus } from 'src/enum';

@Schema({ timestamps: true })
export class SagaMongo {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  type: string; // REGISTER_USER, CREATE_ORDER, etc.

  @Prop({ required: true })
  step: string; // user.created, mail.sent...

  @Prop({ enum: ESagaStatus, default: ESagaStatus.PENDING })
  status: ESagaStatus;

  @Prop({ required: true })
  meta: Record<string, any> | null;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;
}

export type SagaDocument = SagaMongo & Document;
export const SagaSchema = SchemaFactory.createForClass(SagaMongo);
