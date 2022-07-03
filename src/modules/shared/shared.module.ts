import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@shared/config.service';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Global()
@Module({
  providers: [ConfigService],
  imports: [NestConfigModule],
  exports: [ConfigService],
})
export class SharedModule {}
