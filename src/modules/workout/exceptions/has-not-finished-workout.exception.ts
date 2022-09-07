import { ForbiddenException } from '@nestjs/common';

export class HasNotFinishedWorkoutException extends ForbiddenException {
  constructor(notFinishedWorkoutId: string) {
    super({
      name: 'has-not-finished-workout',
      description: 'User has not finished workout!',
      data: { workoutId: notFinishedWorkoutId },
    });
  }
}
