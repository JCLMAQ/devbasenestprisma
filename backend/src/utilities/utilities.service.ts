import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { number } from 'joi';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { EmaildomainsService } from 'src/emaildomains/emaildomains.service';
import { PrismaService } from 'src/prisma/prisma.service';

type emailData = {
    fromEmail: string;
    toEmail: string;
    subjectEmail: string;
    textEmail: string;
    htmlEmail: string
}
@Injectable()
export class UtilitiesService {

    constructor(
        private configService: ConfigService, 
        private prisma: PrismaService,
        private emailDomainsService: EmaildomainsService,
        ) {}

    /*
    *   DataBase config
    */

    async searchConfigParam(configItemName: string): Promise<string | null> {
        // Search for config parameter in the DB, and if not found use the one in the .env config file
         // Return "" if no value found
        const configItem = await this.prisma.configParam.findUnique({where: { name: configItemName },})
        let valueToReturn = null;
        if(!configItem) {
            valueToReturn = this.configService.get<string>(configItemName);
        } else {
            configItem?.value === null ? valueToReturn = this.configService.get<string>(configItemName) : valueToReturn = configItem?.value
        }        
        // If nothing found the value will be : ""
        return valueToReturn
    }

    async searchConfigParamEnvFirst(configItemName: string): Promise<string | null> {
        // TOBETESTED
        // Search for config parameter in .env config file, and if not found use the one in the DB 
        // Return "" if no value found
        let valueToReturn = null;
        let configItem = null;
        const valueFromEnvFile = this.configService.get<string>(configItemName);
        if(valueFromEnvFile == "") {
            configItem = await this.prisma.configParam.findUnique({where: { name: configItemName },});
            configItem?.value == null ? valueToReturn = "" : valueToReturn = configItem?.value 
        } else {
            valueToReturn = valueFromEnvFile;
        }
        valueFromEnvFile === null ? valueToReturn = configItem?.value : valueToReturn = valueFromEnvFile
        return valueToReturn
    }


    /* 
    *    Email management utilities    
    */

    // Compare AppURL with domain of email
    async domainEmailVerification(email: string): Promise<boolean> {
        // Verify that the domain of the email is the accepted one (if this option is activeted) 
        const compareAppUrl = await this.compareDomainOfEmailWithAllowed(email);
        // If yes verify the API of the email
        // If they do not correspond : reject the login or the registration
        return compareAppUrl;
    }

    // Email structure vérification
    async emailValidation(email: string): Promise<boolean> {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // Process with REGEX 
        const okEmail = re.test(String(email).toLowerCase());;
        return okEmail;
    }


    // Sending email
    async sendEmailToken(emailData: emailData): Promise<boolean> {    
    // Step 1: buildup the transporter - connexion to the SMTP
        // Connexion - transporter data: EMAIL_HOST, EMAIL_PORT, EMAIL_NOREPLY, EMAIL_NOREPLY_PWD
        const transporter = nodemailer.createTransport({
                host: await this.searchConfigParam("EMAIL_HOST"),
                port: await this.searchConfigParam("EMAIL_PORT"),
                auth: {
                    user: await this.searchConfigParam("EMAIL_NOREPLY"),
                    pass: await this.searchConfigParam("EMAIL_NOREPLY_PWD"),
                }
                // host: this.configService.get("EMAIL_HOST"),
                // port: this.configService.get("EMAIL_PORT"),
                // auth: {
                //     user: this.configService.get("EMAIL_NOREPLY"), 
                //     pass: this.configService.get("EMAIL_NOREPLY_PWD"), 
                // }
            } as unknown as SMTPTransport.Options);
    // Step 2: buildup the email
        const {fromEmail, toEmail, subjectEmail, textEmail, htmlEmail } = emailData
        // Email to send with defined transport object
        const mailDetails = await transporter.sendMail({
           from: fromEmail, // Sender address // '"No reply" <project.1@localhost>'
           to: toEmail, // List of receivers
           subject: subjectEmail, // Subject line
           text: textEmail, // plain text body // `NestJS your token: ${token}.`
           html: htmlEmail // HTML body // html: `Hello <br> Please, use this token to confirm your login : ${token} <br>
        });        
    // Step 3: Sending email
        const sendMail = await new Promise<boolean>(async function (resolve, reject) {
            return await transporter.sendMail(mailDetails, async (err: Error, info: string) => {
                if (err) return reject(false);
                return resolve(true);
            });
        });    
        return sendMail;
    }

    async compareURLOfEmail(emailDomain: string, email: string){
        // Compare with received data (emailDomain and email)
        const res = email.split("@");
        const domain = res[1];
        if(emailDomain == domain){
            return true
        }
        return false
    }

    async compareDomainOfEmailWithAllowed(email: string): Promise<boolean> {
        // Compare with data fo the DB
        const res = email.split("@");
        const domain = res[1];
        return await this.emailDomainsService.isEmailDomainAccepted(domain);
    }

    /*
    *   Delay utilities
    */

    // Delay between the present moment and the past date time
    async timeStampDelay(dateStampToTest: Date, delayMilliSecond: number): Promise<boolean> {
       const tooShort = (new Date().getTime() - dateStampToTest.getTime()) < delayMilliSecond;
       return tooShort;
    }

    // Delay between two date time
    async twoTimeStampsDelay(dateStampOne: Date, dateStampTwo: Date, delayMilliSecond: number): Promise<boolean> {
        const tooShort = (dateStampOne.getTime() - dateStampTwo.getTime()) < delayMilliSecond;
        return tooShort;
    }

    async dateLessDelay(dateInit: Date, delayMilliSecond: number): Promise<Date>{
        const newDate = new Date(dateInit.getTime()- delayMilliSecond);
        return newDate 
    }
    
    
}
