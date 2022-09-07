import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddWorkoutExerciseDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  workoutId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  exerciseId: string;
}
