import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { ConfigService } from '@nestjs/config';

// import { ConfigModule } from '@nestjs/config';// 
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UtilitiesModule } from 'src/utilities/utilities.module';
import { UsersModule } from 'src/users/users.module';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';
import { LocalStrategy } from './local.strategy';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    PrismaModule,
    UtilitiesModule,
    UsersModule,
    // ConfigModule,
    // ConfigModule.forRoot(
    //   { envFilePath: '../.env' }),
    // // PassportModule,
    PassportModule.register({
        defaultStrategy: 'jwt'
    }),
    JwtModule.register({ 
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '240s' },
    })
  ],
  controllers: [
    AuthsController
  ],
  providers: [
    ConfigService,
    PrismaService,
    AuthsService,
    UsersService,
    JwtStrategy,
    LocalStrategy,
  ],
  exports: [AuthsService]
})
export class AuthsModule {}
