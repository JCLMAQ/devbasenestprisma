import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    if (!user || user.isDeleted) {
      throw new UnauthorizedException();
    }
    return user;
  }
  
}