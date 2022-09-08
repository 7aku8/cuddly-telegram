import { ExerciseDto } from '@modules/exercise/interfaces/exercise.dto';

export class GetAllExercisesResponseDto {
  constructor(private readonly exercises: ExerciseDto[]) {}
}
