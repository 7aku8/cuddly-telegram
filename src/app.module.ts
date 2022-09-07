import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from '@modules/shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@modules/auth/auth.module';
import { WorkoutModule } from '@modules/workout/workout.module';
import { PrismaModule } from '@modules/prisma/prisma.module';

type TEnvironmentName = 'production' | 'staging' | 'development';
const getEnvFileName = (nodeEnv: TEnvironmentName) => {
  switch (nodeEnv) {
    case 'production':
      return '.env.production';
    case 'staging':
      return '.env.staging';
    case 'development':
      return '.env.development';
  }
};

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFileName(<TEnvironmentName>process.env.NODE_ENV),
    }),
    WorkoutModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
