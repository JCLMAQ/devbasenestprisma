import { Injectable } from '@nestjs/common';
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
    async generateAuthToken(tokenId: number): Promise<any> {
      const jwtPayload = { tokenId }
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
  async loginHandler(email: string) {
    // A emailToken (short token) is generated
    const emailToken = await this.generateEmailToken();
    const emailSender = this.configService.get("EMAIL_NOREPLY");
    const emailData = {
      ffromEmail: `"No reply" <${emailSender}>` ,
      toEmail: email,
      subjectEmail: `Your Token for login.`,
      textEmail: `NestJS your token: ${emailToken}.`,
      htmlEmail: `Hello <br> Please, use this token to confirm your login : ${emailToken} <br>`
    }

    // Define the emailToken expiration time
    const tokenExpiration = await this.emailTokenExpiration();

console.log('Email token expiration:' + tokenExpiration)

    // Create of the token with an expiration time-date and link it to the user (email)
    await this.prismaService.token.create({
      data: {
        emailToken,
        type: TokenType.EMAIL,
        expiration: tokenExpiration,
        user: {
          connectOrCreate: {
            create: {
              email: email,
            },
            where: {
              email: email,
            },
          },
        },
      },
    })

    // Send the email with the token
   const sendMail = await this.utilitiesService.sendEmailToken(emailData);

console.log("Sended email: ", sendMail);
  }

  // Step 2: Verify the validity of the short token linked to the email of the user
  async authenticateHandler(userCredential) {
console.log('User credential: ', userCredential);
    const { email, emailToken } = userCredential;
    const validEmailToken= { validToken: false, tokenId: null};
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
        console.log('Is the emailToken still valid:', validEmailToken)
        validEmailToken.validToken=false;
        return validEmailToken
    }
    // Verify token again expiration limits
    if (fetchedEmailToken.expiration < new Date()) {
        // If the the expiration time of the token is passed, return false
        console.log('Verify token again expiration limits:', validEmailToken)
        validEmailToken.validToken=false;
        return validEmailToken
    }
    // If evrything is in order, continue the process
    console.log("If evrything is in order, continue the process")
    // If token matches the user email passed in the payload, generate long lived API token
    if (fetchedEmailToken?.user?.email === email) {
      const tokenExpiration = await this.jwtTokenExpiration();
      console.log("token expiration", tokenExpiration);
      // Persist token in DB so it's stateful
      validEmailToken.tokenId= await this.prismaService.token.create({
        data: {
            type: TokenType.API,
            expiration: tokenExpiration,
            user: {
            connect: {
                email,
            },
            },
        },
      });
      validEmailToken.validToken = true;
    };
    // Invalidate the email token after it's been used
    await this.prismaService.token.update({
        where: {
            id: fetchedEmailToken.id,
        },
        data: {
            valid: false,
        },
    });
    return validEmailToken;
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
