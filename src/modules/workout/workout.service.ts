import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';
import { HasNotFinishedWorkoutException } from '@modules/workout/exceptions/has-not-finished-workout.exception';

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
}
