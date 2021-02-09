import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UtilitiesModule } from './utilities/utilities.module';
import { AuthsModule } from './auths/auths.module';
import { PrismaModule } from './prisma/prisma.module';
import * as Joi from 'joi';
import * as path from 'path';
import { I18nModule, I18nJsonParser, QueryResolver, HeaderResolver, AcceptLanguageResolver } from 'nestjs-i18n';
import { EmaildomainsModule } from './emaildomains/emaildomains.module';
import { FilesModule } from './files/files.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: '../.development.env', // Look for .env file in the main directory and not in the backend directory
      envFilePath: '../.env', // Look for .env file in the main directory
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
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      fallbacks: {
        'en-CA': 'fr',
        'en-*': 'en',
        'fr-*': 'fr',
        pt: 'pt-BR',
      },
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang', 'locale', 'l'] },
        new HeaderResolver(['x-custom-lang']),
        AcceptLanguageResolver,
      ],
    }),
    PrismaModule,
    UsersModule,
    UtilitiesModule,
    AuthsModule,
    EmaildomainsModule,
    MulterModule,
    // MulterModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     dest: configService.get<string>('FILES_STORAGE_DEST') || './upload',
    //     limits: {fileSize: configService.get<number>('FILES_MAX_SIZE') || 2000000} 
    //   }),
    //   inject: [ConfigService],
    // }),
    FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
