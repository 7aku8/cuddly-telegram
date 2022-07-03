import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@shared/config.service';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

const jwtFromHeader = (req: Request) => {
  const [, token] = req.header('authorization').split(' ');

  console.log('token', token);

  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.authConfig.authority}/.well-known/jwks.json`,
      }),
      // secretOrKey: passportJwtSecret({
      //   cache: true,
      //   rateLimit: true,
      //   jwksRequestsPerMinute: 5,
      //   jwksUri: `${configService.authConfig.authority}/.well-known/jwks.json`,
      // }),

      jwtFromRequest: jwtFromHeader,
      // audience: configService.authConfig.clientId,
      // issuer: 'https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2_RAkSFMU9F',
      algorithms: ['RS256'],
    });
  }

  public validate(payload: any) {
    return !!payload.sub;
  }
}
