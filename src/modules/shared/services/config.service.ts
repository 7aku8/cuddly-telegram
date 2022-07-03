import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { isNil } from 'lodash';

@Injectable()
export class ConfigService {
  constructor(private nestConfigService: NestConfigService) {}

  get isDevelopment() {
    return this.nodeEnv === 'development';
  }

  get isProduction() {
    return this.nodeEnv === 'production';
  }

  get isTest() {
    return this.nodeEnv === 'test';
  }

  private get(key: string) {
    const value = this.nestConfigService.get<string>(key);

    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set');
    }

    return value;
  }

  private getNumber(key: string) {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  private getBoolean(key: string) {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' env var is not a boolean');
    }
  }

  private getString(key: string) {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  get nodeEnv() {
    return this.getString('NODE_ENV');
  }

  get appConfig() {
    return {
      port: this.getNumber('PORT'),
      host: this.getString('HOST'),
      basicAuth: {
        username: this.getString('BASIC_AUTH_USERNAME'),
        password: this.getString('BASIC_AUTH_PASSWORD'),
      },
    };
  }

  get authConfig() {
    return {
      authority: this.getString('COGNITO_AUTHORITY'),
      userPoolId: this.getString('COGNITO_USER_POOL_ID'),
      appClientId: this.getString('COGNITO_APP_CLIENT_ID'),
    };
  }
}
