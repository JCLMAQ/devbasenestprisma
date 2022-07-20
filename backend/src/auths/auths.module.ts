import { Module } from '@nestjs/common';
import { AuthsController } from './auths.controller';
import { AuthsService } from './auths.service';


// import { ConfigModule } from '@nestjs/config';// 
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { UtilitiesModule } from '../utilities/utilities.module';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PrismaModule,
    UtilitiesModule,
    UsersModule,
    // ConfigModule.forRoot(
    //   { envFilePath: '../.env' }),
    // PassportModule,
    PassportModule.register({
        defaultStrategy: 'jwt'
    }),
    JwtModule.register({ 
      secret: process.env.JWT_SECRET,
    //  signOptions: { expiresIn: '60s' },
      signOptions: { expiresIn: process.env.JWT_VALIDITY_DURATION },
    })
  ],
  controllers: [
    AuthsController
  ],
  providers: [

    // PrismaService,
    AuthsService,
    // UsersService,
    JwtStrategy,
    LocalStrategy,
  ],
  exports: [AuthsService]
})
export class AuthsModule {}
