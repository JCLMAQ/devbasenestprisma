import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UtilitiesModule } from './utilities/utilities.module';
import { AuthsModule } from './auths/auths.module';
import { PrismaModule } from './prisma/prisma.module';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: '../.development.env', // Look for .env file in the main directory and not in the backend directory
      envFilePath: '.env', // Look for .env file in the backend directory
      isGlobal: true, // No need to import ConfigModule in each module
      expandVariables: true, // Allow expanded variable = ${VARIABLE_NAME}
    }
   
  ),
    PrismaModule,
    UsersModule,
    UtilitiesModule,
    AuthsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
