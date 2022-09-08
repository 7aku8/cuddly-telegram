import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FinishWorkoutRequestDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  workoutId: string;
}
