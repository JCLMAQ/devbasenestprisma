import { Controller, Get, Post, Body, Put, Param, Delete, Request, HttpException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { AuthsService } from './auths.service';
import { AuthDto } from './dto/auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from '@prisma/client';
import { ExtractJwt } from 'passport-jwt';
import { I18n, I18nContext, I18nLang, I18nService } from 'nestjs-i18n';

@Controller('auths')
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService,
    private configService: ConfigService, 
    private usersService:  UsersService, 
    private i18n: I18nService,
    ) {}

  // Common
    // Get the profile of the user
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        // Rturn the loged user
    console.log('Authcontroler (localstrategy): Profile return:', req.user);       
        return req.user;
    }

    // Verify if the user exist (with his email)
    @UseGuards(JwtAuthGuard)
    @Post('checkCredential')
    async checkCredential(@Body('email') email: string) {
        // TODO To complete one day for profile user managment
        const user = await this.usersService.getOneUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException();
        }
        return {
            email: user.email,
            fullName: user.firstName + " " + user.lastName
        };
    }

    /* 
    Password less part
    */

    // PasswordLess Login
    @UseGuards(LocalAuthGuard)
    @Post('auth/loginpwdless')
    async login(@Body('email') email: string, @I18nLang() lang: string) {
        // need to add the param "lang" at the and of the post to get the lang which is used
        const registration = false; // As we are in the login part
        const autoRegistration = this.configService.get("AUTO_REGISTRATION_ENABLE") == 1;
        // const sendEmailDelay = true // Delay betwwen to send email actif
        const sendEmailDelay = this.configService.get("DELAY_BTW_EMAIL_ENABLE") == 1;
        return this.authsService.loginPwdLess(email, registration, sendEmailDelay, autoRegistration, lang);
    }

    // PasswordLess registration
    @UseGuards(LocalAuthGuard)
    @Post('auth/registrationpwdless')
    async registration(@Body('email') email: string, @I18nLang() lang: string) {
        const registration = true; // To show that we are within the resitraton part
        // const sendEmailDelay = true // Delay betwwen to send email actif
        const autoRegistration = this.configService.get("AUTO_REGISTRATION_ENABLE") == 1;
        const sendEmailDelay = this.configService.get("DELAY_BTW_EMAIL_ENABLE") == 1;
        console.log("Lang :", lang)
        return this.authsService.loginPwdLess(email, registration, sendEmailDelay, autoRegistration, lang);
    }

    // PasswordLess Authentication
    @UseGuards(LocalAuthGuard)
    @Post('auth/authenticatepwdless')
    async authentication(@Body() userCredential: AuthDto, @I18nLang() lang: string) {
        // userCredential has to content the email and the emailToken (rename to "password" to get through the localAuthGuards)
        const validCredential = await this.authsService.authenticateHandler(userCredential, lang);
        if(!validCredential.validToken) {
            throw new HttpException(await this.i18n.translate("auths.AUTH_LOGIN_ERROR",{ lang: lang, }), 400);
        }
        const authToken = await this.authsService.generateAuthToken(validCredential.email, validCredential.userId, validCredential.role);
        return authToken;
    }

      // Delete one user
// TODO Delete one user by admin

      // Deelte request by the user (RGPD)
// TODO Delete one user by the user itself

    // PasswordLess Logout
    @UseGuards(LocalAuthGuard)
    @Post('auth/logoutpwdless')
    async logoutPwdLess(@Body() userCredential: AuthDto, @I18nLang() lang: string) {
        const isOK = await this.authsService.logout(userCredential.email, lang);
        if (!isOK) {
            throw new HttpException(await this.i18n.translate("auths.AUTH_LOGOUT_ERROR",{ lang: lang, }),400);
        }
        const user = '';
        return { user }
    }


/*
    Login with password (and email)
*/
    // Login with the password and the email
    // @UseGuards(LocalAuthGuard)
    @Post('auth/loginwithpwd')
    async loginWithPwd(@Request() req) {
console.log('Authcontroler (localstrategy):', req.user)
        return this.authsService.loginWithPwd(req.user);
        // return req.user;
    }

    // Logout with password and email autehntication
    @Post('auth/logoutwithpwd')
    async logoutPwd(@Body() userCredential: AuthDto, @I18nLang() lang: string ) {
        const isOK = await this.authsService.logout(userCredential.email, lang);
        if (!isOK) {
            return {}
        }
        const user = '';
        const authJwtToken = '';
        return { user, authJwtToken }
    }

    @Post('auth/registerwithpwd')
    async createOneUser(@Body() userData: User): Promise<boolean> {
console.log('new user', userData);
        return this.authsService.createOneUserWithPwd(userData);
    }

// Forgot Password Part

    // Send the forgot password email (with the lik to come back and change password)
    @Post('auth/email/forgot-password')
    async sendEmailForgotPassword(@Request() req, @I18nLang() lang: string): Promise<any> {
console.log('forgot pwd email:', req.email);
        try {
            const isEmailSent = await this.authsService.sendEmailForgotPwd(req.body.email, lang);
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

    // Validate the password forgot token send back
    @Get('auth/email/reset-password/:token')
    async validateToken(@Param() params, @I18nLang() lang: string): Promise<any> {
        let valideTkn;
        try {
            valideTkn = await this.authsService.verifyForgotPwdToken(params.token, lang);
        } catch (error) {
            return {
                success: false,
                message: `${error}`
            }
        }
        return valideTkn;
    }

    // Reset forgotpwd: the new password and the verification password
    @Post('auth/email/reset-password/:token')
    async resetPwd(@Param() params, @Request() req, @I18nLang() lang: string): Promise<any> {
        const { newPassword, verifyPassword } = req.body;
        let valideTknObj;
        let user;
        try {
            valideTknObj = await this.authsService.verifyForgotPwdToken(params.token, lang);
console.log('token', valideTknObj);
        } catch (error) {
            return {
                success: false,
                message: `${error}`
            }
        }
        if (!valideTknObj) return {
            success: false,
            message: 'Invalid token'
        }

        try {
            user = await this.authsService.userExist(valideTknObj.email, lang);
        } catch (error) {
            return {
                success: false,
                message: `${error}`
            }
        }
        if (!user) return {
            success: false,
            message: 'Invalid token'
        }

        if (!newPassword || !verifyPassword || (newPassword !== verifyPassword)) return {
            success: false,
            message: 'Invalid password'
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
