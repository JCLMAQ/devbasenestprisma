import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenType } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { UtilitiesService } from 'src/utilities/utilities.service';

import { AuthDto } from './dto/auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthsService {
 
  constructor(
    private readonly usersService: UsersService,
    private readonly utilitiesService: UtilitiesService,
    private prismaService: PrismaService,
    private configService: ConfigService, 
    private jwtService: JwtService,
  ) { }
  
  logout() {
    console.log("Log out")
    return true;
  }

// PasswordLess Authentication Schema
  /*
   Utilities
  */
  // Generate a random 8 digit number as the email token
  async generateEmailToken(): Promise<string> {
    return Math.floor(10000000 + Math.random() * 90000000).toString()
  }

  // Generate the expiration time of the email token
  async emailTokenExpiration() {
    const minutestoAdd = Number(this.configService.get("EMAIL_TOKEN_EXPIRATION_MINUTES"));
    const currentDate = new Date();
    const emailTokenExpirationDate = new Date(currentDate.getTime()+ (minutestoAdd*60*1000));
    return emailTokenExpirationDate
  }

  // Generate the expiration time of the JWT token
  async jwtTokenExpiration() {
    const hoursToAdd = Number(this.configService.get("JWT_TOKEN_EXPIRATION_HOURS"));
    const currentDate = new Date();
    const jwtTokenExpirationDate =  new Date(currentDate.getTime()+ (hoursToAdd*60*60*1000));
    return jwtTokenExpirationDate
  }

  // Generate a signed JWT token with the tokenId in the payload
  async generateAuthToken(userEmail: string, userId: string, tokenId: number): Promise<any> {
    const jwtPayload = { username: userEmail, sub: userId, tokenid: tokenId}
    return  {
      access_token: this.jwtService.sign(jwtPayload)
    }
  }
  
  // Fetch the token from DB to verify it's valid
  async verifyDBTokenMatch(tokenId) {       
      const fetchedToken = await this.prismaService.token.findOne({
          where: {
              id: tokenId,
          },
          include: {
              user: true,
          },
      });
      // Check if token could be found in database and is valid
      if (!fetchedToken || !fetchedToken?.valid) {
          return { isValid: false, errorMessage: 'Invalid Token' }
      }
      // Check token expiration
      if (fetchedToken.expiration < new Date()) {
          return { isValid: false, errorMessage: 'Token expired' }
      }
      // Token is valid return credential
      return {
          isValid: true,
          credentials: {
              tokenId: tokenId,
              userId: fetchedToken.userId,
              isAdmin: fetchedToken.user.isAdmin,
          },
      }
  }
    /*
     End of utilities
    */

    /*
     Start Login processes
    */

    // const {fromEmail, toEmail, subjectEmail, textEmail, htmlEmail } = emailData

  // Step 1: Login handler: with the email create or update the user and send an email to the user 
  async loginHandler(email: string, registration: boolean) {
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
      console.log("New token : ", emailToken); 
        tokenAlreadyExist = await this.prismaService.token.findFirst({
        where: {
           emailToken: { equals: emailToken
        }}});
    }
   

    const emailSender = this.configService.get("EMAIL_NOREPLY");
    const emailData = {
      fromEmail: `"No reply" <${emailSender}>` ,
      toEmail: email,
      subjectEmail: `Your Token for login.`,
      textEmail: `NestJS your token: ${emailToken}.`,
      htmlEmail: `Hello <br> Please, use this token to confirm your login : ${emailToken} <br>`
    }

    // Define the emailToken expiration time
    const tokenExpiration = await this.emailTokenExpiration();

    let userFound = await this.usersService.findOneUser({email});

    if(!userFound && !registration) {  
      throw new HttpException('You have to register first', 400);
    } 
    if(userFound && registration) {  
      throw new HttpException('You are already registered, please sign in...', 400);
    }
    if(!userFound && registration) {
      userFound = await this.usersService.createUser({email}); // registration of a new user
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
    }

    // If exist: just update it, if does not: create a new one
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

// To DELETE for dev only
console.log("Token created or updated: ", tokenCreatedorupdated );

    // Send the email with the token
    const sendMail = await this.utilitiesService.sendEmailToken(emailData);
    if (sendMail) {
      return sendMail
    } else {
      throw new HttpException('Error on sending email', 400);
    }
    
  }
    
 // Step 2: Verify the validity of the short token linked to the email of the user
 async authenticateHandler(userCredential) {
  const { email, emailToken } = userCredential;
  const validEmailToken= { email: email, userId: null, validToken: false, tokenId: null};
  // Get short lived email token
  const fetchedEmailToken = await this.prismaService.token.findOne({
    where: {
        emailToken: emailToken,
    },
    include: {
        user: true,
    },
  })

  // Is the emailToken still valid
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
  // If token matches the user email passed in the payload, generate long lived API token
  if (fetchedEmailToken?.user?.email === email) {
    const tokenExpiration = await this.jwtTokenExpiration();
    // Persist token in DB so it's stateful

    // Find the token with the userid and the type
    let tokenExist = await this.prismaService.token.findFirst({
      where: {
        userId: { equals: fetchedEmailToken.userId },
        type: { equals:TokenType.API },
      }
    })
  
    let tokenId = 0
    if(!tokenExist) {
      tokenId = 0;
    } else {
      tokenId = tokenExist.id;
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
      },
      create: {
//        emailToken: "",
        type: TokenType.API,
        expiration: tokenExpiration,
        userId: fetchedEmailToken.userId
      }
    })
    
    // Invalidate the email token after it's been used
    await this.prismaService.token.update({
        where: {
            id: fetchedEmailToken.id,
        },
        data: {
            valid: false,
        },
    });

    // Create the return answer
    validEmailToken.email = email;
    validEmailToken.userId = fetchedEmailToken.userId;
    validEmailToken.tokenId = tokenExist.id;
    validEmailToken.validToken = true;
    return validEmailToken;
    }  
  }

  async validateUser(userEmail: string): Promise<any> {
    // username = email
    const user = await this.usersService.getOneUserByEmail(userEmail);
    if (user) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

}
