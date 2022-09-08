import { ForbiddenException } from '@nestjs/common';

export class NotOwnerOfWorkoutException extends ForbiddenException {
  constructor(workoutId: string) {
    super({
      name: 'not-owner-of-workout',
      description: 'Workout has been created by other user!',
      data: { workoutId },
    });
  }
}
