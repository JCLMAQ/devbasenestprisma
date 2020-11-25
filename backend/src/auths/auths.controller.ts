import { Controller, Get, Post, Body, Put, Param, Delete, Request, HttpException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { AuthsService } from './auths.service';
import { AuthDto } from './dto/auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auths')
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService,
    private configService: ConfigService, 
    private usersService:  UsersService
    ) {}

// TODO : Add localstrategy and jwt strategy guard

  // Common
  @Get('profile')
  async getProfile(@Request() req) {
console.log('Authcontroler (localstrategy): Profile return:', req.user);
    // TODO To complete one day for profile user managment
      return req.user;
  }

  @Post('checkCredential')
  async checkCredential(@Body('emailToCheck') email: string) {
console.log("reload checkcredential:",email);
      const user = await this.usersService.getOneUserByEmail(email);
      // console.log("user", user);
      if (!user) {
console.log('User does not exist on the database.');
          throw new UnauthorizedException();
      }
console.log("reload checkcredential user found:", user);
      return {
          email: user.email,
          fullName: user.firstName + " " + user.lastName
      };
  }

  /* 
  Password less part
  */

  // PasswordLess Login
  @Post('auth/loginpwdless')
  async login(@Body('email') email: string) {
console.log('Authcontroler (localstrategy):', email);
    const registration = false; // As we are in the login part
    const autoRegistration = this.configService.get("AUTO_REGISTRATION_ENABLE") == 1;
    // const sendEmailDelay = true // Delay betwwen to send email actif
    const sendEmailDelay = this.configService.get("DELAYBTWEMAIL_ENABLE") == 1;
console.log("Autoregistration:", autoRegistration, this.configService.get("AUTO_REGISTRATION_ENABLE"))
console.log("delaybtw email:", sendEmailDelay, this.configService.get("DELAYBTWEMAIL_ENABLE"))
    return this.authsService.loginPwdLess(email, registration, sendEmailDelay, autoRegistration);
  }

  // PasswordLess registration
  @Post('auth/registrationpwdless')
  async registration(@Body('email') email: string) {
console.log('Authcontroler (localstrategy) for registraiton:', email);
    const registration = true; // To show that we are within the resitraton part
    // const sendEmailDelay = true // Delay betwwen to send email actif
    const autoRegistration = this.configService.get("AUTO_REGISTRATION_ENABLE") == 1;
console.log("Autoregistration:", autoRegistration)
    const sendEmailDelay = this.configService.get("DELAYBTWEMAIL_ENABLE") == 1;
console.log("delaybtw email:", sendEmailDelay)
    return this.authsService.loginPwdLess(email, registration, sendEmailDelay, autoRegistration);
  }

  // PasswordLess Authentication
  @Post('auth/authenticatepwdless')
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

      // Delete one user
// TODO Delete one user by admin

      // Deelte request by the user (RGPD)
// TODO Delete one user by the user itself

    // PasswordLess Logout
  @Post('auth/logoutpwdless')
  async logoutPwdLess() {
    const isOK = await this.authsService.logout();
console.log("AuthCOntrolers logout :", isOK)
    if (!isOK) {
        return {}
    }
    const user = '';
console.log("AuthCOntrolers logout - done", user)
    return { user }
  }
  /*
      Login with password (and email)
  */
 // Login with the password and the email
  @Post('auth/loginwithpwd')
  async loginWithPwd(@Request() req) {

      console.log('Authcontroler (localstrategy):', req.user)

      return this.authsService.loginWithPwd(req.user);
  }

  // Logout with password and email autehntication
  @Post('auth/logout')
  async logoutPwd() {
    const isOK = await this.authsService.logout();
console.log("AuthCOntrolers logout :", isOK)
    if (!isOK) {
        return {}
    }
    const user = '';
    const authJwtToken = '';
console.log("AuthCOntrolers logout - done", user, authJwtToken)
    return { user, authJwtToken }
  }

// Forgot Password Part
  @Post('auth/email/forgot-password')
  async sendEmailForgotPassword(@Request() req): Promise<any> {
console.log('forgot pwd email:', req.email);
      try {
          const isEmailSent = await this.authsService.sendEmailForgotPwd(req.body.email);
          if (isEmailSent) {
              return {
                  success: true,
                  message: 'Email sent succefully'
              }
          } else {
              return {
                  success: false,
                  message: 'Email not sent'
              }
          }
      } catch (error) {
          return {
              success: false,
              message: `${error}`
          }
      }
  }
      // Validate the password forgot token
  @Get('auth/email/reset-password/:token')
  async validateToken(@Param() params): Promise<any> {
      let valideTkn;
      try {
          valideTkn = await this.authsService.verifyForgotPwdToken(params.token);
      } catch (error) {
          return {
              success: false,
              message: `${error}`
          }
      }
      return valideTkn;
  }

  // Reset forgotpwd
  @Post('auth/email/reset-password/:token')
    async resetPwd(@Param() params, @Request() req): Promise<any> {
        const { newPassword, verifyPassword } = req.body;
        let valideTknObj;
        let user;
        try {
            valideTknObj = await this.authsService.verifyForgotPwdToken(params.token);
console.log('token', valideTknObj);
        } catch (error) {
            return {
                success: false,
                message: `${error}`
            }
        }
        if (!valideTknObj) return {
            success: false,
            message: 'invalid token'
        }

        try {
            user = await this.authsService.userExist(valideTknObj.email);
        } catch (error) {
            return {
                success: false,
                message: `${error}`
            }
        }
        if (!user) return {
            success: false,
            message: 'invalid token'
        }

        if (!newPassword || !verifyPassword || (newPassword !== verifyPassword)) return {
            success: false,
            message: 'invalid password'
        }

        const userUpdated = await this.authsService.editForgotPwd(newPassword, user.id);
        if (userUpdated && userUpdated.id) return {
            success: true,
            message: 'Updated succefully'
        }
        return {
            success: false,
            message: 'Error on update'
        }
    }

}
