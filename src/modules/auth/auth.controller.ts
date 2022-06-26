import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body()
    payload: {
      name: string;
      password: string;
      email: string;
      gender: string;
      phone_number: string;
    },
  ) {
    return await this.authService.registerUser(payload);
  }

  @Post('login')
  async login(@Body() payload: { name: string; password: string }) {
    try {
      await this.authService.authenticateUser(payload);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
