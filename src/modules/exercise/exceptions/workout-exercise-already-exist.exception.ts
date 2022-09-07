import { ForbiddenException } from '@nestjs/common';

export class WorkoutExerciseAlreadyExistException extends ForbiddenException {
  constructor(exerciseId: string, workoutId: string) {
    super({
      name: 'workout-exercise-already-exist',
      description:
        'This exercise has already been created for specified workout',
      data: { workoutId, exerciseId },
    });
  }
}
