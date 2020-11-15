import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigService,
  ],
  controllers: [AuthsController],
  providers: [AuthsService]
})
export class AuthsModule {}
