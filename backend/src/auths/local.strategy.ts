import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthsService } from './auths.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authsService: AuthsService
    ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
console.log('validate (local strategy)', username, password)
    const user = await this.authsService.validateUser(username, password);
console.log('Validated user (local strategy)', user)
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
  
}