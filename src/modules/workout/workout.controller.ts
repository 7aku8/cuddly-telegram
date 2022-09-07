import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateWorkoutRequestDto } from '@modules/workout/dto/createWorkout/request.dto';
import { WorkoutService } from '@modules/workout/workout.service';
import { CreateWorkoutResponseDto } from '@modules/workout/dto/createWorkout/response.dto';

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
  async createWorkout(@Body() payload: CreateWorkoutRequestDto) {
    const { id: workoutId } = await this.workoutService.createWorkout();

    return new CreateWorkoutResponseDto(workoutId);
  }
}
