import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Middleware } from '@prisma/client';
import * as nodemailer from 'nodemailer';
import { from } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UtilitiesService {

    constructor(
        private configService: ConfigService, 
        private prisma: PrismaService
        ) {}

    /* 
        Email management utilities    
    */
    async sendEmailToken(emailData): Promise<boolean> {    
    // Step 1: buildup the transporter - connexion to the SMTP
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

    // Delay between the present moment and the past date time
    async timeStampDelay(dateStampToTest: Date, delayMinutes: number) {
        const tooshort = (new Date().getTime() - dateStampToTest.getTime()) / 60000 < delayMinutes;
        return tooshort;
    }

    // Delay between two date time
    async twoTimeStampsDelay(dateStampOne: Date, dateStampTwo: Date, delayMinutes: number) {
        const tooshort = (dateStampOne.getTime() - dateStampTwo.getTime()) / 60000 < delayMinutes;
        return tooshort;
    }

/*
Test Primsa MiddelWare
*/
    // OmitPasswordInUser: Middleware = async (params, next) => {
    //     const result = await next(params);
        
    //     if(params.model === "User") {
    //         const { password, ...rest } = result;
    //         return rest;
    //     }
        
    //     return result;
    // }
    
    //  prisma.$use(OmitPasswordInUser);

    

    // softDeleteMiddelware = this.prisma.$use(async (params, next) => {
    // // Check incoming query type
    // if (params.model == "Post") {
    //     if (params.action == "delete") {
    //         // Delete queries
    //         // Change action to an update
    //         params.action = "update";
    //         params.args["data"] = { isDeleted: new Date };
    //     }
    //     if (params.action == "deleteMany") {
    //         // Delete many queries
    //         params.action = "updateMany";
    //         if (params.args.data != undefined) {
    //         params.args.data["isDeleted"] = new Date;
    //         } else {
    //         params.args["data"] = { isDeleted: new Date };
    //         }
    //     }
//     }
//     return next(params);
//   });


}

