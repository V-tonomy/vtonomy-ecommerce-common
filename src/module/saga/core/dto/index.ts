import { IsOptional, IsString } from 'class-validator';
import { ESagaStatus } from 'src/enum';

// create-saga.dto.ts
export class CreateSagaDTO {
  @IsString()
  sagaId: string;

  @IsString()
  type: string;

  @IsString()
  step: string;

  @IsString()
  status: ESagaStatus;
  
  meta: string;
}

export class UpdateSagaDTO {
  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  step?: string;

  @IsString()
  @IsOptional()
  status?: ESagaStatus;
  
  meta?: string;
}
