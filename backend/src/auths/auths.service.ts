import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { User,TokenType, Prisma, Token } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { UtilitiesService } from 'src/utilities/utilities.service';

import { AuthDto } from './dto/auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { pbkdf2Sync, randomBytes } from 'crypto';
// import MilliSecond from 'ms';
import * as MilliSecond from 'ms'
import { AcceptLanguageResolver, I18nContext, I18nRequestScopeService, I18nService } from 'nestjs-i18n';


@Injectable()
export class AuthsService {

  constructor(
    private readonly usersService: UsersService,
    private readonly utilitiesService: UtilitiesService,
    private prismaService: PrismaService,
    private configService: ConfigService, 
    private jwtService: JwtService,
    // private i18n: I18nRequestScopeService
    private i18n: I18nService,
    // private i18nContext: I18nContext,
  ) { }
  
  // Local Strategy validation
  async validateUser(username: string, plainTextPassword: string): Promise<any> {
    // Call by localStrategy
    // username = email
    // const lang = "en";
    // const emailValidation = await this.emailValidationProcess(username, lang);
    const user = await this.usersService.getOneUserByEmail(username);
    if(this.configService.get('PWDLESS_LOGIN_ENABLE') == 0 && user !== null) {
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

  async logout(userEmail, lang: string): Promise<boolean> {
    // Search for the user token and reinit for the email send token - for PwdLess login
    // Verify that the user has not been deleted or soft deleted
    const userNotDeleted = await this.usersService.userStillExist(userEmail);
    if(userNotDeleted.isDeleted != null) {
      throw new HttpException(await this.i18n.translate("users.USER_DELETED",{ lang: lang, }), 400)
    }
    // Reinit the sendEmail pwdless
    await this.logoutInvalidEmailToken(userNotDeleted.id)
    // Logout with JWT_LOGOUT_ENABLE = 1  - Does logout with a devalidation of the JWT token
    const jwtLogoutEnable = await this.utilitiesService.searchConfigParam( "JWT_LOGOUT_ENABLE" )
    if(jwtLogoutEnable === "1") {
      // if(this.configService.get("JWT_LOGOUT_ENABLE") == 1) {
      // If yes, then manage the API token validity
      const createOrUpdateToken = await this.mgtAPIToken(userNotDeleted.id, "API", "", true );
      if(! createOrUpdateToken) return false
    }
    return true;
  }

/*
  Common utilities
*/

  // Generate a random 8 digit number as the email token
  async generateEmailToken(): Promise<string> {
    let emailToken = Math.floor(10000000 + Math.random() * 90000000).toString();
    let tokenAlreadyExist = await this.prismaService.token.findFirst({
      where: {
        emailToken: { equals: emailToken }
      }
    });
    // Create a new emailToken if already exist
    while (
      tokenAlreadyExist != null && typeof(tokenAlreadyExist) == "object"
    ) {
      emailToken = Math.floor(10000000 + Math.random() * 90000000).toString()
      tokenAlreadyExist = await this.prismaService.token.findFirst({
      where: {
        emailToken: { equals: emailToken}
      }});
    }
    return emailToken
  }

  // Generate the expiration time of the email token (pwdless and forgotpwd email)
  async emailTokenExpiration(forPwdLess: boolean): Promise<Date> {
    let expirationTime: string;
    forPwdLess ? expirationTime = "EMAIL_TOKEN_EXPIRATION" : expirationTime = "FORGOT_TOKEN_EXPIRATION"
    let tokenExpirationTime = await this.utilitiesService.searchConfigParam( expirationTime );
    const milliSecondToAdd = MilliSecond(tokenExpirationTime);
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
    const delayToAdd = await this.utilitiesService.searchConfigParam( "JWT_VALIDITY_DURATION" );
    // const delayToAdd = this.configService.get<string>("JWT_VALIDITY_DURATION")
    let milliSecondToAdd = MilliSecond(delayToAdd);  
    const currentDate = new Date();
    const jwtTokenExpirationDate =  new Date(currentDate.getTime()+ milliSecondToAdd);
    return jwtTokenExpirationDate
  }

  // Update the API token
  async mgtAPIToken(userId: string, tokenType: TokenType, emailToken: string, logout: boolean) {
    // For logout:  logout is true, valid has to be false
    // Email token has to be unique, so for API token use the userId to fill it
    if(emailToken === ""){ emailToken = userId };
    
    // Find the token with the userid and the type
    let tokenExist = await this.prismaService.token.findFirst({
      where: {
        userId: { equals: userId },
        type: { equals:tokenType },
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
      // Token expiration are different for API and FORGOT
      tokenType == TokenType.API ? tokenExpiration = await this.jwtTokenExpiration() : tokenExpiration = await this.emailTokenExpiration( false )
    }
    // Create or update a longlived token record
    tokenExist = await this.prismaService.token.upsert({
      where: {
        id: tokenId
      },
      update: {
        emailToken,
        type: tokenType,
        expiration: tokenExpiration,
        valid: !logout
      },
      create: {
        emailToken,
        type: tokenType,
        expiration: tokenExpiration,
        userId: userId,
        valid: !logout
      }
    })
    return tokenExist
  }
   // Verify delay between sending email
  async verifyDelayBtwEmailIsStillRunning(expirationTime: Date, lang: string): Promise<boolean>{
    let delayStillRunning = false; // Allow new email to be send
    const delayToTest = await this.utilitiesService.searchConfigParam( "EMAIL_DELAY_BTW" )
  //  const delayToTest = this.configService.get<string>("EMAIL_DELAY_BTW");
    const milliSecondToAdd = MilliSecond(delayToTest);
    delayStillRunning =  await this.utilitiesService.timeStampDelay(expirationTime, milliSecondToAdd)
    // Verify delay between emailbase on the updateAt field
    if ( delayStillRunning) {
      throw new HttpException(await this.i18n.translate("auths.EMAIL_ALREADY_SEND",{ lang: lang, }), 400);
    }
    return delayStillRunning
  }
   
  /*
  PasswordLess Authentication Schema
*/
  /*
    Utilities for passwordLess
  */

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
      const delayValue = await this.utilitiesService.searchConfigParam( "EMAIL_TOKEN_EXPIRATION" )
      const delayMilliSecond = (MilliSecond(delayValue))*2;
      // const delayMilliSecond = (MilliSecond(this.configService.get<string>("EMAIL_TOKEN_EXPIRATION")))*2;
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

  async emailValidationProcess(email: string, lang: string): Promise<boolean> {
    // Email validation against the strucure of the email and the domain (if doamin restriction active)
     // Verify the username email looks well as an email
    const goodEmail = await this.utilitiesService.emailValidation(email);
    if (!goodEmail) {
      throw new HttpException(await this.i18n.translate("auths.EMAIL_NOT_VALID",{ lang: lang, }), 400);
    }
     // Verify the domain is accepted if the fonctionality is activeted
    // const apiEmailActiveted = (this.configService.get<number>("EMAIL_LIMIT_DOMAIN") == 1);
    const apiEmailActiveted = (await this.utilitiesService.searchConfigParam( "EMAIL_LIMIT_DOMAIN" ) === "1");
    if(apiEmailActiveted ){
      const compareAppUrl = await this.utilitiesService.domainEmailVerification(email);
      if(!compareAppUrl) {
        throw new HttpException(await this.i18n.translate("auths.EMAIL_BAD",{ lang: lang, }), 400);
      }
    }
    return true
  }

  async userLoginOrRegistration(email: string, autoRegistration: boolean, registration: boolean, lang: string) {
    // Is the User already registred ?
    let userFound = await this.usersService.findUniqueUser({email});
    if(autoRegistration && !userFound) { // Registration
      userFound = await this.usersService.createUser({email}); // registration auto of a new user
      // if(!userFound) {
      //   // Registration failed
      //   throw new HttpException(await this.i18n.translate("users.USER_REGISTRATION_FAIL",{ lang: lang, }), 400);
      // }
    } else {
      if(!userFound && !registration) {  
        throw new HttpException(await this.i18n.translate("auths.REGISTER_FIRST",{ lang: lang, }), 400);
      } 
      if(userFound && registration) {  
        throw new HttpException(await this.i18n.translate("users.REGISTER_ALREADY",{ lang: lang, }), 400);
      }
      if(!userFound && registration) {
        userFound = await this.usersService.createUser({email}); // registration of a new user
        }
    }
    if(!userFound) {
      // Registration failed
      throw new HttpException(await this.i18n.translate("users.USER_REGISTRATION_FAIL",{ lang: lang, }), 400);
    }
    if(!userFound) {
        // Registration failed
        throw new HttpException(await this.i18n.translate("users.USER_REGISTRATION_FAIL",{ lang: lang, }), 400);
      }
    return userFound;
  }
  
  /*
    End of utilities
  */

/*
  Start PasswordLess Login process
*/
  // logout pwd Less

  // Login pwd Less
  // Step 1: Login handler: with the email create or update the user and send an email to the user 
  async loginPwdLess(email: string, registration: boolean, sendEmailDelay: boolean, autoRegistration: boolean, lang:  string) {
    // Verify if the limitation to the email API is activeted
    // and Verify the username email looks well as an email
    await this.emailValidationProcess(email, lang);
    // Is the User already registred ? If not create the new user
    const userFound = await this.userLoginOrRegistration(email, autoRegistration, registration, lang);
    const emailToken = await this.generateEmailToken();
    // Config data for the email to send with the token
    const emailSender = await this.utilitiesService.searchConfigParam( "EMAIL_NOREPLY" );
    // const emailSender = this.configService.get("EMAIL_NOREPLY");
    const emailData = {
      fromEmail: `"No reply" <${emailSender}>` ,
      toEmail: email,
      subjectEmail: `Your Token for login.`,
      textEmail: `NestJS your token: ${emailToken}.`,
      htmlEmail: `Hello <br> Please, use this token to confirm your login : ${emailToken} <br>`
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
      // Verify that the delay between email sending is still running 
      const delayBetweenEmailEnable = sendEmailDelay;
      if(delayBetweenEmailEnable) { 
        const delayBwnEmailStillRunning = await this.verifyDelayBtwEmailIsStillRunning(tokenExist.updatedAt, lang);
      }
    }
    // If exist: just update it, if does not: create a new one
    // Define the emailToken expiration time
    const tokenExpiration = await this.emailTokenExpiration( true );
    // Create or Update the email token
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
      throw new HttpException(await this.i18n.translate("auths.EMAIL_TOKEN_CRASH",{ lang: lang, }), 400);
    }
  }
    
  // Step 2: Verify the validity of the short token linked to the email of the user
  async authenticateHandler(userCredential, lang) {
    // The emailToken is the "password"
    const { email, password } = userCredential;
    // Verify that the user has not been deleted or soft deleted
    const userNotDeleted = await this.usersService.userStillExist(email);
    if(userNotDeleted.isDeleted != null) {
      throw new HttpException(await this.i18n.translate("users.USER_DELETED",{ lang: lang, }), 400)
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
    const delayMilliSecond = MilliSecond(await this.utilitiesService.searchConfigParam( "EMAIL_DELAY_BTW" ));
    // const delayMilliSecond = MilliSecond(this.configService.get<string>("EMAIL_DELAY_BTW"));
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
      
      if(await this.utilitiesService.searchConfigParam( "JWT_LOGOUT_ENABLE") === "1") {
      // if(this.configService.get("JWT_LOGOUT_ENABLE") == 1) {
        // If yes, then manage the API token validity
        const createOrUpdateToken = await this.mgtAPIToken(fetchedEmailToken.userId,"API", "", false )
        !createOrUpdateToken ? validEmailToken.validToken = false : validEmailToken.validToken = true;
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

  async loginWithPwd(email: string, plaintextPassword: string, lang: string) {
    // Verify the email domain (if restriction active) and the structure of the email
  const emailValidation = await this.emailValidationProcess(email, lang);
    // Verify that the user exist
    let userFound = await this.usersService.findUniqueUser({email});
    console.log("User found :", userFound)
    if(!userFound) {
      // need to register first
      throw new HttpException(await this.i18n.translate("auths.REGISTER_FIRST",{ lang: lang, }), 400);
    }
    // Create the token.API if LOGOUT with JWT cancel 
    if(await this.utilitiesService.searchConfigParam( "JWT_LOGOUT_ENABLE") === "1") {
    // if(this.configService.get("JWT_LOGOUT_ENABLE") == 1) {
      // If yes, then manage the API token validity
      const createOrUpdateToken = await this.mgtAPIToken(userFound.id, "API", "", false )
    }
    // Buildup the payload for the access token
    const payload = { username: userFound.email, sub: userFound.id, role: userFound.Role };
    // Full Name replacement
    let fullName: string = userFound.firstName + " " + userFound.lastName
    ;
    if((userFound.firstName == "") || (userFound.lastName == "")) {
      ( userFound.nickName == "") ? fullName = userFound.email : fullName = userFound.nickName
    }
    return {
      access_token: this.jwtService.sign(payload),
      fullName: fullName,
      roles: userFound.Role
    };
  }



  // Create one new user when register with a password and an email as username
  async registerWithPwd(userData, lang): Promise<any> {
    const registration = true;
    const autoRegistration = false;
    // Verify if the limitation to the email API is activeted and if the email is conform
    const emailValidation = await this.emailValidationProcess(userData.email, lang);
    // Is the User already registred ? If yes send an error, If not create the new user
    const userExist = await this.usersService.findUniqueUser({email: userData.email});
    if(userExist === null){
      // Create a salt and Hash the password with it 
      const salt = randomBytes(16).toString('base64');
      const pwdHash = AuthsService.hashPassword(userData.password, salt);
      const {password, ...userDataWithoutThePwd } = userData;
      // Try to create a new user
      const result = await this.usersService.createOneUserWithPwd(userDataWithoutThePwd, pwdHash, salt);
      // If the creation failed, send an error
      if(!result) {
        // Throw an error
        throw new HttpException(await this.i18n.translate("auths.REGISTRATION_FAIL",{ lang: lang, }), 400);
      }
      return result;
    }
    if(userExist?.isDeleted) {
      // User still exist but has been soft deleted !
      throw new HttpException(await this.i18n.translate("auths.REGISTER_ADMIN_CONTACT",{ lang: lang, }), 400);
    }
      // Already registered...
    throw new HttpException(await this.i18n.translate("auths.REGISTER_ALREADY",{ lang: lang, }), 400);
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
    const isOK = (pwdHash == user.pwdHash);
    console.log("Password OK : ", isOK )
    return isOK
  }

/*
  Forgot Password process
*/

  async createForgotToken(email: string, userId: string, lang:string ): Promise<any> {
    const forgotPwd = await this.prismaService.token.findFirst({where: {userId: { equals: userId }, type: { equals:TokenType.FORGOT },}});
    let isForgotPwdTokenDelayOver = true;
    // forgotPwd token exist, need to verify if it is stiil within validity delay
    if(forgotPwd){
      isForgotPwdTokenDelayOver = (forgotPwd.expiration < new Date());
    }
    const newForgotPwdDelayTime = await this.emailTokenExpiration(false);
    const emailToken = await this.generateEmailToken()
    const createOrUpdateToken = await this.mgtAPIToken(userId, "FORGOT", emailToken , false )

    if(!createOrUpdateToken) throw new HttpException(await this.i18n.translate("auths.FORGOT_PWD_ERROR",{ lang: lang, }), 400);

    const newForgotPwd = await this.prismaService.token.findFirst({where: {userId: { equals: userId }, type: { equals:TokenType.FORGOT },}});

    if (newForgotPwd) {
      return newForgotPwd
    } else {
      throw new HttpException(await this.i18n.translate("auths.FORGOT_PWD_ERROR",{ lang: lang, }), 400);
    }
  }

  // Sending forgot password email with the link
  async sendEmailForgotPwd(emailForgotPwd: string, lang: string): Promise<boolean> {
    // Verify the email is an email and is from an accepted domain
    const emailValidation = await this.emailValidationProcess(emailForgotPwd, lang);
    // Verify if the user exist
    const userExist = await this.prismaService.user.findUnique({ where: { email: emailForgotPwd } });
    if (!userExist) throw new HttpException(await this.i18n.translate("users.USER_EMAIL_NOT_FOUND",{ lang: lang, }), 400);
    // Need to manage soft deleted user
    if(userExist?.isDeleted != null) throw new HttpException(await this.i18n.translate("users.USER_DELETED",{ lang: lang, }), 400);

    // Create the forgot  password token
    const tokenForgotPwd = await this.createForgotToken(emailForgotPwd, userExist.id, lang);
    // If the token has been created, send the email
    if (tokenForgotPwd && tokenForgotPwd.emailToken) {    
      // Config data for the email to send with the token
      const emailSender = await this.utilitiesService.searchConfigParam( "EMAIL_NOREPLY" );
      // const emailSender = this.configService.get("EMAIL_NOREPLY");
      const hostWebAddress = await this.utilitiesService.searchConfigParam( "APP_FRONT_END");
      // const hostWebAddress = this.configService.get("APP_FRONT_END");
      const emailData = {
        fromEmail: `"No reply" <${emailSender}>` ,
        toEmail: emailForgotPwd,
        subjectEmail: `Forgot Password reinitialyse Link.`,
        textEmail: `To resert your password click on the link.`,
        htmlEmail: `Hello <br> to reset your password click the link below <br>
        <a href='${hostWebAddress}/reset-password/${tokenForgotPwd.emailToken}'>Click here</a>` // html body
      }

      // Send the email with the link
      const sendMail = await this.utilitiesService.sendEmailToken(emailData);
      if (!sendMail) throw new HttpException(await this.i18n.translate("auths.EMAIL_TOKEN_CRASH",{ lang: lang, }), 400);
      return sendMail
    } else throw new HttpException(await this.i18n.translate("auths.FORGOT_PWD_ERROR",{ lang: lang, }), 400);
  }

  // Verify that the token received with the forgot password link is valid and in delay (used by controlers)
  async verifyForgotPwdToken(token: string, lang: string): Promise<Token> {
    // Search for the token
    const forgotPwdModel = await this.prismaService.token.findUnique({ where: { emailToken: token } });
    // No token found : 
    if (!forgotPwdModel) throw new HttpException(await this.i18n.translate("auths.FORGOT_PWD_BAD_TOKEN",{ lang: lang, }), 400);
    // Verify the token still valid (valid = true)
    // Verify the token still valid (time delay)
    const isForgotPwdTokenDelayOver = (forgotPwdModel.expiration < new Date());
    if (isForgotPwdTokenDelayOver || !forgotPwdModel.valid ) throw new HttpException(await this.i18n.translate("auths.FORGOT_PWD_BAD_TOKEN",{ lang: lang, }), 400);
    // Need to unvalid the token (token only one use)
    await this.prismaService.token.update({
      where: {
          id: forgotPwdModel.id,
      },
      data: {
          valid: false,
          // expiration: newExpirationDate
      },
    });
      return forgotPwdModel;
  }

  // Record the new password hasched with salt
  async editForgotPwd(pwd: string, userId: string): Promise<User> {
    const salt = randomBytes(16).toString('base64');
    const pwdHash = AuthsService.hashPassword(pwd, salt);
    const result = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        salt,
        pwdHash,
      }
    })
    return result
  }
  
  async isUserExist(email: string, lang: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { email } })
    if (!user) throw new HttpException(await this.i18n.translate("users.USER_NOT_FOUND",{ lang: lang, }), 400);
    return user;
  }

  async isUserSoftDeleted(email: string, lang: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { email } })
    if (!user?.isDeleted) throw new HttpException(await this.i18n.translate("users.USER_DELETED",{ lang: lang, }), 400);
    return user;
  }
}
