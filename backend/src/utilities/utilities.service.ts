import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { from } from 'rxjs';

@Injectable()
export class UtilitiesService {

    constructor(
        private configService: ConfigService, 
        ) {}

    /* 
        Email management utilities    
    */
    async sendEmailToken(emailData): Promise<boolean> {

// console.log('Email data : ', emailData );
// console.log(this.configService.get("HOST_EMAIL")," /",this.configService.get("EMAIL_NOREPLY"), " / ", this.configService.get("PWD_NOREPLY"));
    
    // Step one: buildup the transporter - connexion to the SMTP
        // Connexion - transporter data: HOST_EMAIL, EMAIL_PORT, EMAIL_NOREPLY, PWD_NOREPLY
        const transporter = nodemailer.createTransport({
            host: this.configService.get("HOST_EMAIL"),
            port: this.configService.get("EMAIL_PORT"),
            auth: {
                user: this.configService.get("EMAIL_NOREPLY"), 
                pass: this.configService.get("PWD_NOREPLY"), 
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
}
