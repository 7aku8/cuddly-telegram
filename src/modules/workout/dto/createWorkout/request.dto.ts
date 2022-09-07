import { IsNotEmpty, IsString, IsUUID, ValidateIf } from 'class-validator';
import { isNil } from 'lodash';

export class CreateWorkoutRequestDto {
  @ValidateIf((payload) => !isNil(payload.workoutTemplateId))
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  workoutTemplateId?: string;
}
