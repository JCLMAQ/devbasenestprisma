import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UtilitiesModule } from './utilities/utilities.module';
import { AuthsModule } from './auths/auths.module';
import { PrismaModule } from './prisma/prisma.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: '../.development.env', // Look for .env file in the main directory and not in the backend directory
      envFilePath: '.env', // Look for .env file in the backend directory
      isGlobal: true, // No need to import ConfigModule in each module
      expandVariables: true, // Allow expanded variable = ${VARIABLE_NAME}
      cache: true, // To accelarate the env variables loading
      validationSchema: Joi.object({
        // NODE_ENV: Joi.string()
        //   .valid('development', 'production', 'test', 'provision')
        //   .default('development'),
        NEST_SERVER_PORT: Joi.number().default(3000),
        JWT_VALIDITY_DURATION: Joi.string().default('240s')
      }),
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
