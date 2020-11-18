import { Controller, Get, Post, Body, Put, Param, Delete, HttpException } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthDto } from './dto/auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('auth/login')
    async login(@Body('email') email: string) {

        console.log('Authcontroler (localstrategy):', email);

        return this.authsService.loginHandler(email);
    }
    @Post('auth/authenticate')
      async authentication(@Body() userCredentiel: AuthDto) {
        // async authentication(@Body('userCredentiel') userCredentiel: any) {
        // userCredential has to content the email and the emailToken
        console.log("Usercredential", userCredentiel);
        const validCredential = await this.authsService.authenticateHandler(userCredentiel);
        if(!validCredential.validToken) {
          throw new HttpException('Error on authenticate process', 400);
        }
        const authToken = await this.authsService.generateAuthToken(validCredential.tokenId.id);

        return authToken;
      }
      
}
