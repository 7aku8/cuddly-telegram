import { NotFoundException } from '@nestjs/common';

export class ExerciseNotFoundException extends NotFoundException {
  constructor(exerciseId: string) {
    super({
      name: 'exercise-not-found',
      description: 'Exercise with given id has not been found',
      data: { exerciseId },
    });
  }
}
