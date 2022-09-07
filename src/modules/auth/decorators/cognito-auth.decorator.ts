import {applyDecorators, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import { JwtStrategy } from '@modules/auth/strategies/jwt.strategy';

export function CognitoAuth(): MethodDecorator {
  return applyDecorators(UseGuards(AuthGuard(JwtStrategy.strategyName)));
}