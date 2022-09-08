import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';
import { ExerciseNotFoundException } from '@modules/exercise/exceptions/exercise-not-found.exception';
import { WorkoutNotFoundException } from '@modules/workout/exceptions/workout-not-found.exception';
import { WorkoutExerciseAlreadyExistException } from '@modules/exercise/exceptions/workout-exercise-already-exist.exception';

type TAddWorkoutExercise = {
  workoutId: string;
  exerciseId: string;
};

@Injectable()
export class ExerciseService {
  constructor(private readonly prisma: PrismaService) {}

  async addWorkoutExercise({ exerciseId, workoutId }: TAddWorkoutExercise) {
    const exercise = await this.prisma.exercise.findFirst({
      where: { id: exerciseId },
    });

    if (!exercise) {
      throw new ExerciseNotFoundException(exerciseId);
    }

    const workout = await this.prisma.workout.findFirst({
      where: { id: workoutId },
    });

    if (!workout) {
      throw new WorkoutNotFoundException(workoutId);
    }

    const workoutExercise = await this.prisma.workoutExercise.findUnique({
      where: {
        workoutId_exerciseId: {
          workoutId,
          exerciseId,
        },
      },
    });

    if (workoutExercise) {
      throw new WorkoutExerciseAlreadyExistException(exerciseId, workoutId);
    }

    const lastWorkoutExercise = await this.prisma.workoutExercise.findFirst({
      where: {
        workoutId,
      },
      select: { order: true },
      orderBy: { order: 'desc' },
    });

    await this.prisma.workoutExercise.create({
      data: {
        workoutId,
        exerciseId,
        order: lastWorkoutExercise?.order ?? 1,
      },
    });
  }

  async getAllExercises() {
    return this.prisma.exercise.findMany();
  }
}
