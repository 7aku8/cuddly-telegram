import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { WorkoutService } from '@modules/workout/workout.service';
import { CreateWorkoutResponseDto } from '@modules/workout/dto/createWorkout/response.dto';
import { FinishWorkoutResponseDto } from '@modules/workout/dto/finishWorkout/response.dto';
import { FinishWorkoutRequestDto } from '@modules/workout/dto/finishWorkout/request.dto';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  // @CognitoAuth()
  @Get()
  getWorkouts() {
    return ['workout1', 'workout2'];
  }

  // @CognitoAuth()
  @Post()
  async createWorkout() {
    // @Body() payload: CreateWorkoutRequestDto
    const { id: workoutId } = await this.workoutService.createWorkout();

    return new CreateWorkoutResponseDto(workoutId);
  }

  @Put('finish')
  async finishWorkout(@Body() payload: FinishWorkoutRequestDto) {
    const userId = '';
    await this.workoutService.finishWorkout({ ...payload, userId });

    return new FinishWorkoutResponseDto();
  }
}
