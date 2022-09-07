import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@shared/config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'cognito-jwt') {
  static strategyName = 'cognito-jwt';

  constructor(private readonly configService: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.authConfig.authority}/.well-known/jwks.json`,
      }),

      audience: configService.authConfig.appClientId,
      issuer: configService.authConfig.authority,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['RS256'],
    });
  }

  public async validate(payload: any) {
    console.log(payload);
    return !!payload.sub;
  }
}
