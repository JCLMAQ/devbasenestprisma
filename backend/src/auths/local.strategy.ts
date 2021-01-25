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
    console.log("localstrategy: ", user)
    if (!user || user.isDeleted != null) {
      throw new UnauthorizedException();
    }
    return user;
  }
  
}