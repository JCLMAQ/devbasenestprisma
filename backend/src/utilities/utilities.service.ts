import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class UtilitiesService {

    constructor(
        private configService: ConfigService, 
        ) {}

    /* 
        Email management utilities    
    */

    // Compare AppURL with domain of email
    async apiEmailVerification(email: string){
        // Verify that the domain of the email is the accepted one (if this option is activeted)
        
        const appURL = this.configService.get<string>("EMAIL_ALLOWED_DOMAIN");
        const compareAppUrl = await this.compareURLOfEmail(appURL, email);
        // If yes verify the API of the email
        // If they do not correspond : reject the login or the registration
        return compareAppUrl;
    }

    // Email structure vérification
    async emailValidation(email: string) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // Process with REGEX 
        const okEmail = re.test(String(email).toLowerCase());;
        return okEmail;
    }


    // Sending email
    async sendEmailToken(emailData): Promise<boolean> {    
    // Step 1: buildup the transporter - connexion to the SMTP
        // Connexion - transporter data: EMAIL_HOST, EMAIL_PORT, EMAIL_NOREPLY, EMAIL_NOREPLY_PWD
        const transporter = nodemailer.createTransport({
            host: this.configService.get("EMAIL_HOST"),
            port: this.configService.get("EMAIL_PORT"),
            auth: {
                user: this.configService.get("EMAIL_NOREPLY"), 
                pass: this.configService.get("EMAIL_NOREPLY_PWD"), 
            }
        });
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
            return await transporter.sendMail(mailDetails, async (err, info) => {
                if (err) return reject(false);
                return resolve(true);
            });
        });    
        return sendMail;
    }

    // Delay between the present moment and the past date time
    async timeStampDelay(dateStampToTest: Date, delayMilliSecond: number) {
       const tooshort = (new Date().getTime() - dateStampToTest.getTime()) < delayMilliSecond;
       return tooshort;
    }

    // Delay between two date time
    async twoTimeStampsDelay(dateStampOne: Date, dateStampTwo: Date, delayMilliSecond: number) {
        const tooshort = (dateStampOne.getTime() - dateStampTwo.getTime()) < delayMilliSecond;
        return tooshort;
    }

    async dateLessDelay(dateInit: Date, delayMilliSecond: number){
        const newDate = new Date(dateInit.getTime()- delayMilliSecond);
        return newDate 
    }
    
    async compareURLOfEmail(emailUrl: string, email: string){
        const res = email.split("@");
        const domain = res[1];
        if(emailUrl == domain){
            return true
        }
        return false
    }
}
