import { Body, Controller, Post } from '@nestjs/common';
import { ExerciseService } from '@modules/exercise/exercise.service';
import { AddWorkoutExerciseDto } from '@modules/exercise/dto/addWorkoutExercise/request.dto';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post('workout')
  async addWorkoutExercise(@Body() payload: AddWorkoutExerciseDto) {
    await this.exerciseService.addWorkoutExercise(payload);

    // $TODO add response!
  }
}
