import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('workout')
export class WorkoutController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getWorkouts() {
    return ['workout1', 'workout2'];
  }
}
