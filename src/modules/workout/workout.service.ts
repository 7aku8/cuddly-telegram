import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';
import { HasNotFinishedWorkoutException } from '@modules/workout/exceptions/has-not-finished-workout.exception';
import dayjs from 'dayjs';
import { WorkoutNotFoundException } from '@modules/workout/exceptions/workout-not-found.exception';
import { NotOwnerOfWorkoutException } from '@modules/workout/exceptions/not-owner-of-workout.exception';

type TFinishWorkout = {
  userId: string;
  workoutId: string;
};

@Injectable()
export class WorkoutService {
  constructor(private readonly prisma: PrismaService) {}

  async createWorkout() {
    const externalUserId = 'dcc7fd06-a461-4139-b6f4-6f49614c9101';

    const notFinishedWorkout = await this.prisma.workout.findFirst({
      where: {
        user: {
          externalUserId,
        },
        finishedAt: null,
      },
      select: {
        id: true,
      },
    });

    if (notFinishedWorkout) {
      throw new HasNotFinishedWorkoutException(notFinishedWorkout.id);
    }

    return this.prisma.workout.create({
      data: {
        user: {
          connectOrCreate: {
            create: {
              externalUserId,
            },
            where: {
              externalUserId,
            },
          },
        },
      },
      select: {
        id: true,
      },
    });
  }

  async finishWorkout({ workoutId, userId }: TFinishWorkout) {
    const workout = await this.prisma.workout.findUnique({
      where: {
        id: workoutId,
      },
      select: {
        userId: true,
      },
    });

    if (!workout) {
      throw new WorkoutNotFoundException(workoutId);
    }
    if (workout.userId != userId) {
      throw new NotOwnerOfWorkoutException(workoutId);
    }

    const workoutExercisesAmount = await this.prisma.workoutExercise.count({
      where: { workoutId },
    });

    if (workoutExercisesAmount) {
      return this.prisma.workout.update({
        where: { id: workoutId },
        data: { finishedAt: dayjs().toDate() },
      });
    }

    return this.prisma.workout.delete({
      where: { id: workoutId },
    });
  }
}
