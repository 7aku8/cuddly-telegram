import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExerciseService } from '@modules/exercise/exercise.service';
import { AddWorkoutExerciseRequestDto } from '@modules/exercise/dto/addWorkoutExercise/request.dto';
import { AddWorkoutExerciseResponseDto } from './dto/addWorkoutExercise/response.dto';
import { GetAllExercisesResponseDto } from '@modules/exercise/dto/getAllExercises/response.dto';
import { ExerciseDto } from '@modules/exercise/interfaces/exercise.dto';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get()
  async getAllExercises() {
    const exercises = await this.exerciseService.getAllExercises();

    return new GetAllExercisesResponseDto(
      exercises.map((exercise) => new ExerciseDto(exercise)),
    );
  }

  @Post('workout')
  async addWorkoutExercise(@Body() payload: AddWorkoutExerciseRequestDto) {
    await this.exerciseService.addWorkoutExercise(payload);

    return new AddWorkoutExerciseResponseDto();
  }
}
