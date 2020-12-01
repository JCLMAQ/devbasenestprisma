import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy  } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private prismaService: PrismaService
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }


  async validate(payload: any) {
    const user = await this.usersService.userStillExist(payload.username);
    if (!user || user.isDeleted) {
      throw new UnauthorizedException();
    }
    // Verify that the JWT payload is not cancel (even if the JWT is still valid - expiration time still OK)
    // The idea is that the logout action unvalid the API token

    // TODO 
    let tokenExist = await this.prismaService.token.findFirst({
      where: {
        userId: { equals: user.id },
        type: { equals: "API" },
      }
    }) 
    if(tokenExist) {
      if(!tokenExist.valid){
        throw new UnauthorizedException();
      }
    }
    return { userId: payload.sub, username: payload.username, role: user.Role };
  }
}