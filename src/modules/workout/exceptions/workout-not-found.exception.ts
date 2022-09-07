import { NotFoundException } from '@nestjs/common';

export class WorkoutNotFoundException extends NotFoundException {
  constructor(workoutId: string) {
    super({
      name: 'workout-not-found',
      description: 'Workout with given id has not been found',
      data: { workoutId },
    });
  }
}
