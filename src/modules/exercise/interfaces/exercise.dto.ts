import { Exercise as ExerciseModel } from '@prisma/client';

export class ExerciseDto {
  private readonly id: string;
  private readonly name: string;

  constructor(exercise: ExerciseModel) {
    this.id = exercise.id;
    this.name = exercise.name;
  }
}
