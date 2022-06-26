import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { ConfigService } from '@shared/config.service';

@Injectable()
export class AuthService {
  private readonly userPool: CognitoUserPool;
  private sessionUserAttributes: object;

  constructor(private readonly configService: ConfigService) {
    this.userPool = new CognitoUserPool({
      UserPoolId: configService.authConfig.userPoolId,
      ClientId: configService.authConfig.clientId,
    });
  }

  async registerUser({
    name,
    email,
    password,
    gender,
    phone_number,
  }: {
    name: string;
    email: string;
    password: string;
    gender: string;
    phone_number: string;
  }) {
    return new Promise((resolve, reject) =>
      this.userPool.signUp(
        name,
        password,
        [
          new CognitoUserAttribute({ Name: 'name', Value: name }),
          new CognitoUserAttribute({ Name: 'email', Value: email }),
          new CognitoUserAttribute({ Name: 'gender', Value: gender }),
          new CognitoUserAttribute({
            Name: 'phone_number',
            Value: phone_number,
          }),
        ],
        null,
        (error, result) => {
          if (!result) {
            reject(error);
          }
          resolve(result.user);
        },
      ),
    );
  }

  async authenticateUser({
    name,
    password,
  }: {
    name: string;
    password: string;
  }) {
    const authenticateDetails = new AuthenticationDetails({
      Username: name,
      Password: password,
    });

    const userData = {
      Username: name,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);

    return new Promise((resolve, reject) =>
      newUser.authenticateUser(authenticateDetails, {
        onSuccess: (result) => resolve(result),
        onFailure: (err) => reject(err),
      }),
    );
  }
}
