import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddWorkoutExerciseRequestDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  workoutId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  exerciseId: string;
}
