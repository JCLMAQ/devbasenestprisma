import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthsService } from './auths.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authsService: AuthsService
    ) {
    super({
      usernameField: 'email'
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authsService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.isDeleted != null) {
      throw new UnauthorizedException();
    }
    return user;
  }
  
}