import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { User,TokenType, ForgottenPwd, Prisma } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { UtilitiesService } from 'src/utilities/utilities.service';

import { AuthDto } from './dto/auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { pbkdf2Sync, randomBytes } from 'crypto';
import * as MilliSecond from 'ms';


@Injectable()
export class AuthsService {

  constructor(
    private readonly usersService: UsersService,
    private readonly utilitiesService: UtilitiesService,
    private prismaService: PrismaService,
    private configService: ConfigService, 
    private jwtService: JwtService,
  ) { }
  
  async logout(userEmail) {
    // Search for the user token and reinit for the email send token - for PwdLess login
    // Verify that the user has not been deleted or soft deleted
    const userNotDeleted = await this.usersService.userStillExist(userEmail);
    if(userNotDeleted.isDeleted != null) {
      throw new HttpException('User does not exist - anymore - or has been deleted', 400)
    }
    // Reinit the sendEmail pwdless
    await this.logoutInvalidEmailToken(userNotDeleted.id)
    // Logout with JWT_LOGOUT_ENABLE = 1
    if(this.configService.get("JWT_LOGOUT_ENABLE") == 1) {
      // If yes, then manage the API token validity
      const createOrUpdateToken = await this.mgtAPIToken(userNotDeleted.id, true );
      return createOrUpdateToken
    }
    return true;
  }

/*
  PasswordLess Authentication Schema
*/
  /*
    Utilities for passwordLess
  */

  // Generate a random 8 digit number as the email token
  async generateEmailToken(): Promise<string> {
    return Math.floor(10000000 + Math.random() * 90000000).toString()
  }

  // Generate the expiration time of the email token
  async emailTokenExpiration() {
    const milliSecondToAdd = MilliSecond(this.configService.get<string>("EMAIL_TOKEN_EXPIRATION"));
    const currentDate = new Date();
    const emailTokenExpirationDate = new Date(currentDate.getTime()+ milliSecondToAdd);
    return emailTokenExpirationDate
  }

  // Generate a signed JWT token with the tokenId in the payload
  async generateAuthToken(userEmail: string, userId: string, role: string): Promise<any> {
    const jwtPayload = { username: userEmail, sub: userId, role: role}
    return  {
      access_token: this.jwtService.sign(jwtPayload)
    }
  }

  // Generate the expiration time of the JWT token
  async jwtTokenExpiration() {
    const delayToAdd = this.configService.get<string>("JWT_VALIDITY_DURATION")
    let milliSecondToAdd = MilliSecond(delayToAdd);    
    const currentDate = new Date();
    const jwtTokenExpirationDate =  new Date(currentDate.getTime()+ milliSecondToAdd);
    return jwtTokenExpirationDate
  }

  // Update the API token
  async mgtAPIToken(userId: string, logout: boolean) {
    // For logout:  logout is true, valid has to be false
    
    // Find the token with the userid and the type
    let tokenExist = await this.prismaService.token.findFirst({
      where: {
        userId: { equals: userId },
        type: { equals:TokenType.API },
      }
    }) 
    let tokenId = 0
    let tokenExpiration= new Date();
    if(!tokenExist) {
      tokenId = 0;
    } else {
      tokenId = tokenExist.id;
      tokenExpiration = tokenExist.expiration
    }
    // Define the JWT token expiration time
    // Do not change it if logout
    if(!logout) {
      tokenExpiration = await this.jwtTokenExpiration();
    }
    // Create or update a longlived token record
    tokenExist = await this.prismaService.token.upsert({
      where: {
        id: tokenId
      },
      update: {
  //        emailToken: "",
        type: TokenType.API,
        expiration: tokenExpiration,
        valid: !logout
      },
      create: {
  //        emailToken: "",
        type: TokenType.API,
        expiration: tokenExpiration,
        userId: userId,
        valid: !logout
      }
    })
    if(tokenExist){
      return true
    } else { 
      return false
    }
  }
    
  async logoutInvalidEmailToken(userId: string){
    // Reinit the emailToken
    let tokenEmailExist = await this.prismaService.token.findFirst({
      where: {
        userId: { equals: userId },
        type: { equals:TokenType.EMAIL },
      }
    }) 
    if(tokenEmailExist) {
      const tokenEmailId = tokenEmailExist.id;
      // const delayMilliSecond = 
      const delayMilliSecond = (MilliSecond(this.configService.get<string>("EMAIL_TOKEN_EXPIRATION")))*2;
      const newExpirationDate = await this.utilitiesService.dateLessDelay(tokenEmailExist.expiration, delayMilliSecond)
    // Update a longlived token record
      const tokenEmailReInit = await this.prismaService.token.update({
        where: {
          id: tokenEmailId
        },
        data: {
          emailToken: "",
          expiration: newExpirationDate,
          valid: false
        }
      })
    }
  }
  /*
    End of utilities
  */

/*
  Start PasswordLess Login process
*/

  // Step 1: Login handler: with the email create or update the user and send an email to the user 
  async loginPwdLess(email: string, registration: boolean, sendEmailDelay: boolean, autoRegistration: boolean) {
    // Verify if the limitation to the email API is activeted
    const apiActiveted = (this.configService.get<number>("LIMIT_EMAIL_URL") == 1);
    if(apiActiveted){
      const appURL = this.configService.get<string>("APP_URL");
      const compareAppUrl = await this.utilitiesService.compareURLOfEmail(appURL, email);
      // If yes verify the API of the email
      // If they do not correspond : reject the login or the registration
      if(compareAppUrl) {
        throw new HttpException('Email not accepted by the system', 400);
      }
    }
    


    let emailToken = await this.generateEmailToken();
    let tokenAlreadyExist = await this.prismaService.token.findFirst({
      where: {
        emailToken: { equals: emailToken }
      }
    });
    // Create a new emailToken if already exist
    while (
      tokenAlreadyExist != null && typeof(tokenAlreadyExist) == "object"
    ) {
      emailToken = await this.generateEmailToken();
        tokenAlreadyExist = await this.prismaService.token.findFirst({
        where: {
          emailToken: { equals: emailToken
        }}});
    }
    // Config data for the email to send with the token
    const emailSender = this.configService.get("EMAIL_NOREPLY");
    const emailData = {
      fromEmail: `"No reply" <${emailSender}>` ,
      toEmail: email,
      subjectEmail: `Your Token for login.`,
      textEmail: `NestJS your token: ${emailToken}.`,
      htmlEmail: `Hello <br> Please, use this token to confirm your login : ${emailToken} <br>`
    }
    // Define the emailToken expiration time
    // const tokenExpiration = await this.emailTokenExpiration();
    let userFound = await this.usersService.findUniqueUser({email});
    if(autoRegistration && !userFound) {
      userFound = await this.usersService.createUser({email}); // registration auto of a new user
    } else {
      if(!userFound && !registration) {  
        throw new HttpException('You have to register first', 400);
      } 
      if(userFound && registration) {  
        throw new HttpException('You are already registered, please sign in...', 400);
      }
      if(!userFound && registration) {
        userFound = await this.usersService.createUser({email}); // registration of a new user
        }
    }
    // Need to verify that the short token exist or not
    const tokenExist = await this.prismaService.token.findFirst({
      where: {
        userId: { equals: userFound.id },
        type: { equals:TokenType.EMAIL },
      }
    })
    let tokenId = 0
    if(!tokenExist) {
      tokenId = 0;
    } else {
      tokenId = tokenExist.id;
      // Verify that the delay between email is still valid
      const delayBetweenEmailEnable = sendEmailDelay;
      if(delayBetweenEmailEnable) { 
        const delayToTest = this.configService.get<string>("DELAY_BTW_EMAIL");
        const milliSecondToAdd = MilliSecond(delayToTest);
        const testResult =  await this.utilitiesService.timeStampDelay(tokenExist.expiration, milliSecondToAdd)
        // Verify delay between emailbase on the updateAt field
          if ( testResult) {
            throw new HttpException('Email with your token already send (eventually, look in your span)', 400);
        }
      }
  
    }
    // If exist: just update it, if does not: create a new one
    // Define the emailToken expiration time
    const tokenExpiration = await this.emailTokenExpiration();
    const tokenCreatedorupdated = await this.prismaService.token.upsert({
      where: {
        id: tokenId
      },
      update: {
        emailToken,
        type: TokenType.EMAIL,
        valid: true,
        expiration: tokenExpiration,
      },
      create: {
        emailToken,
        type: TokenType.EMAIL,
        valid: true,
        expiration: tokenExpiration,
        userId: userFound.id,
      },
    })
    // Send the email with the token
    const sendMail = await this.utilitiesService.sendEmailToken(emailData);
    if (sendMail) {
      return sendMail
    } else {
      throw new HttpException('Error on sending email with the token', 400);
    }
  }
    
  // Step 2: Verify the validity of the short token linked to the email of the user
  async authenticateHandler(userCredential) {
    const { email, password } = userCredential;
    // Verify that the user has not been deleted or soft deleted
    const userNotDeleted = await this.usersService.userStillExist(email);
    if(userNotDeleted.isDeleted != null) {
      throw new HttpException('User does not exist - anymore - or has been deleted', 400)
    }    
    const validEmailToken= { email: email, userId: null, validToken: false, role: userNotDeleted.Role};  
    // Get short lived email token
    const fetchedEmailToken = await this.prismaService.token.findUnique({
      where: {
          emailToken: password,
      },
      include: {
          user: true,
      },
    })
    // Is the emailToken still valid ?
    if (!fetchedEmailToken?.valid) {
      // If the token doesn't exist or is not valid, return false
      validEmailToken.validToken=false;
      return validEmailToken
    }
    // Verify token again expiration limits
    if (fetchedEmailToken.expiration < new Date()) {
      // If the the expiration time of the token is passed, return false
      validEmailToken.validToken=false;
      return validEmailToken
    }
    // If evrything is in order, continue the process
    // Invalidate the email token after it's been used
    const delayMilliSecond = MilliSecond(this.configService.get<string>("DELAY_BTW_EMAIL"));
    const newExpirationDate= await this.utilitiesService.dateLessDelay(fetchedEmailToken.expiration, delayMilliSecond)
    await this.prismaService.token.update({
      where: {
          id: fetchedEmailToken.id,
      },
      data: {
          valid: false,
          // expiration: newExpirationDate
      },
    });
    // If token matches the user email passed in the payload, generate long lived API token (if JWTLOGOUT is = to 1)
    validEmailToken.email = email;
    validEmailToken.userId = "";
    if (fetchedEmailToken?.user?.email == email) {
      validEmailToken.userId = fetchedEmailToken.userId;
      validEmailToken.validToken = true;
      // Create or update the tokenAPI
      // JWT Logout enable ?
      if(this.configService.get("JWT_LOGOUT_ENABLE") == 1) {
        // If yes, then manage the API token validity
        const createOrUpdateToken = await this.mgtAPIToken(fetchedEmailToken.userId, false )
        validEmailToken.validToken = createOrUpdateToken;
      }
      return validEmailToken;
    }  else {
      validEmailToken.validToken = false;
      return validEmailToken;
    }
  }

  /*
    Email and password Authentication
  */

  async loginWithPwd(user: User) {
console.log('authService login');
  const payload = { username: user.email, sub: user.id, role: user.Role };
console.log('payload:', payload)
  return {
    access_token: this.jwtService.sign(payload),
    fullName: user.firstName +" "+ user.lastName,
    roles: user.Role
  };
}

  async validateUser(username: string, plainTextPassword: string): Promise<any> {
    // username = email
    const user = await this.usersService.getOneUserByEmail(username);
    if(this.configService.get('PWDLESS_LOGIN_ENABLE') == 0) {
      if (this.verifyPassword(user, plainTextPassword)) {
        const { pwdHash, salt, ...result } = user;
        return result;
      } else {
        return null;
      }
    } else {
      const { ...result } = user;
        return result;
    }
  }

  // Create one new user when register with a password and an email as username
  async createOneUserWithPwd(userData): Promise<boolean> {
    // Create a salt and Hash the password with it 
    const salt = randomBytes(16).toString('base64');
    const pwdHash = AuthsService.hashPassword(userData.password, salt);
    const {password, ...userDataWithoutPwd } = userData;
    const result = await this.usersService.createOneUserWithPwd(userDataWithoutPwd, pwdHash, salt);
    return result;
  }

  static hashPassword(password: string, salt: string): string {
    if (salt && password) {
      return pbkdf2Sync(password, Buffer.from(salt, 'base64'), 10000, 64, 'sha512')
        .toString('base64');
    }
    return password;
  }

  verifyPassword(user, plainTextPassword: string) {
    const pwdHash = AuthsService.hashPassword(plainTextPassword, user.salt);
console.log('Verify Password (auth.controller): ', user.pwdHash, pwdHash);
    const isOK = (pwdHash == user.pwdHash);
console.log('Verify password = ', isOK);
    return isOK
  }

/*
  Forgot Password process
*/

  async createForgotToken(email: string): Promise<any> {
console.log('email of forgot password', email);

    // Find and update or Create the forgot pwd data (specific token) in the DB
    const forgotPwd = await this.prismaService.forgottenPwd.findUnique({ where: { email } });
    const newForgotPwdDelayTime = await this.forgotPwdTokenExpiration();
    const isForgotPwdTokenDelayOk = (forgotPwd.expiration < new Date());

    // if a forgotPwd exist for the user (email) and if the delay is still running, do not send a new email
    if (forgotPwd && isForgotPwdTokenDelayOk ) {
      throw new HttpException('Reset password email alaready sent', 400);
    } else {
      // Update or create the forgotPwd record with a pwd token and a udate/creation date
      const newForgotPwd = await this.prismaService.forgottenPwd.upsert({
        where: { email },
        update: {
          pwdToken: (Math.floor(Math.random() * (9000000)) + 1000000).toString(),
          expiration: newForgotPwdDelayTime
        },
        create: {
          email,
          pwdToken: (Math.floor(Math.random() * (9000000)) + 1000000).toString(),
          expiration: newForgotPwdDelayTime
        },
      });
      if (newForgotPwd) {
        return newForgotPwd
      } else {
        throw new HttpException('Error on forgot password', 400);
      }
    }
  }

  // Sending forgot password email with the link
  async sendEmailForgotPwd(emailForgotPwd: string): Promise<boolean> {

console.log('email of forgot password', emailForgotPwd);

    // Verify if the user exist
    const user = await this.prismaService.user.findUnique({ where: { email: emailForgotPwd } });
    if (!user) throw new HttpException('Email (user) not found', 400);

    // Create the forgot  password token
    const tokenForgotPwd = await this.createForgotToken(emailForgotPwd);

console.log('reset token', tokenForgotPwd)

    // If the token has been created, send the email
    if (tokenForgotPwd && tokenForgotPwd.pwdToken) {
      
      // Config data for the email to send with the token
      const emailSender = this.configService.get("EMAIL_NOREPLY");
      const hostWebAddress = this.configService.get("APP_FRONT_END");
      const emailData = {
        fromEmail: `"No reply" <${emailSender}>` ,
        toEmail: emailForgotPwd,
        subjectEmail: `Forgot Password reinitialyse Link.`,
        textEmail: `To resert your password click on the link.`,
        htmlEmail: `Hello <br> to reset your password click the link below <br>
        <a href='${hostWebAddress}/reset-password/${tokenForgotPwd.pwdToken}'>Click here</a>` // html body
      }

      // Send the email with the link
      const sendMail = await this.utilitiesService.sendEmailToken(emailData);
      if (sendMail) {
        return sendMail
      } else {
        throw new HttpException('Error on sending email with the token', 400);
      }

    } else {
      throw new HttpException('Error on forgot password process', 400);
    }
  }

// Generate the expiration time of the forgot password token
  async forgotPwdTokenExpiration() {
    const milliSecondToAdd = this.configService.get("FORGOTPWD_TOKEN_EXPIRATION");
    const currentDate = new Date();
    const emailTokenExpirationDate = new Date(currentDate.getTime()+ milliSecondToAdd);
    return emailTokenExpirationDate
  }

  // Verify that the token received with the forgot password link is valid and in delay (used by controlers)
  async verifyForgotPwdToken(token: string): Promise<ForgottenPwd> {
    const newForgotPwdDelayTime = await this.forgotPwdTokenExpiration();
    const forgotPwdModel = await this.prismaService.forgottenPwd.findUnique({ where: { pwdToken: token } });
    const isForgotPwdTokenDelayOk = (forgotPwdModel.expiration < new Date());
    if ((!forgotPwdModel )|| (isForgotPwdTokenDelayOk)) {
      throw new HttpException('Invalid token', 400);
      // return false;
    } else {
      // redirect
      // return true;
      return forgotPwdModel;
    }
  }

  // Record the new password hasched with salt
  async editForgotPwd(pwd: string, userId: string): Promise<User> {
    const salt = randomBytes(16).toString('base64');
    const pwdHash = AuthsService.hashPassword(pwd, salt);
    return await this.prismaService.user.update({
      where: { id: userId },
      data: {
        salt,
        pwdHash,
      }
    })
  }
  
  async userExist(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { email } })
    if (!user) throw new HttpException('User not found', 400);
    return user;
  }
}
