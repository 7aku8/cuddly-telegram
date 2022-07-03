import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';

@Controller('auth')
export class AuthController {}
