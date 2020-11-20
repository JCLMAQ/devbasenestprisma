import { Controller, Get, Post, Body, Put, Param, Delete, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthsService } from './auths.service';
import { AuthDto } from './dto/auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auths')
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService,
    private configService: ConfigService, 
    ) {}

  @Post('auth/login')
  async login(@Body('email') email: string) {

      console.log('Authcontroler (localstrategy):', email);
      const registration = false; // As we are in the login part
      const autoRegistration = this.configService.get("AUTO_REGISTRATION_ENABLE") === "1"
      // const sendEmailDelay = true // Delay betwwen to send email actif
      const sendEmailDelay = this.configService.get("DELAYBTWEMAIL_ENABLE") === "1";
      return this.authsService.loginHandler(email, registration, sendEmailDelay, autoRegistration);
  }

  @Post('auth/registration')
  async registration(@Body('email') email: string) {

      console.log('Authcontroler (localstrategy) for registraiton:', email);
      const registration = true;
      // const sendEmailDelay = true // Delay betwwen to send email actif
      const autoRegistration = this.configService.get("AUTO_REGISTRATION_ENABLE") === "1"
      const sendEmailDelay = this.configService.get("DELAYBTWEMAIL_ENABLE") === "1";
      return this.authsService.loginHandler(email, registration, sendEmailDelay, autoRegistration);
  }


  @Post('auth/authenticate')
      async authentication(@Body() userCredential: AuthDto) {
        // userCredential has to content the email and the emailToken
        console.log("Usercredential received by POST: ", userCredential);
        const validCredential = await this.authsService.authenticateHandler(userCredential);
        if(!validCredential.validToken) {
          throw new HttpException('Error on authenticate process', 400);
        }
        const authToken = await this.authsService.generateAuthToken(validCredential.email, validCredential.userId, validCredential.tokenId);
        return authToken;
      }

}
