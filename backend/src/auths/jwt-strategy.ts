import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@nestjs/config';
import { PrismaClientService } from '../prisma/prisma-client.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  
  constructor(
    private usersService: UsersService,
    private prismaClientService: PrismaClientService, 
    private configService: ConfigService
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }


  async validate(payload: any) {

    // console.log("payload: ", payload)

    const user = await this.usersService.userStillExist(payload.username);
    if (!user || user.isDeleted != null) {
      throw new UnauthorizedException();
    }
    // Verify that the JWT payload is not cancel (even if the JWT is still valid - expiration time still OK)
    // The idea is that the logout action unvalid the API token

    // Only if JWT LOGOUT enable
    if(this.configService.get("JWT_LOGOUT_ENABLE") == 1) {
      let tokenExist = await this.prismaClientService.token.findFirst({
        where: {
          userId: { equals: user.id },
          type: { equals: "API" },
        }
      });
      if(tokenExist) {
        if(!tokenExist.valid){
          throw new UnauthorizedException();
        }
      }
    }
    // console.log("return Jwt-styrategy: ", payload.sub, payload.username, user.Role)
    return { userId: payload.sub, username: payload.username, role: user.Roles };
  }
}