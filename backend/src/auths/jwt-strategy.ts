import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy  } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
console.log('payload to validate: ', payload)
    const user = await this.usersService.userStillExist(payload.username);
    if (!user) {
    throw new UnauthorizedException();
        }
console.log('return after validate payload:','userId:', payload.sub, 'username:', payload.username, 'role:', user.Role)
    return { userId: payload.sub, username: payload.username, role: user.Role };
  }
}