import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Emaildomain, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmaildomainsService {

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async findOneUnique(emaildomainWhereUniqueInput: Prisma.EmaildomainWhereUniqueInput): Promise<Emaildomain | null> {
    return this.prisma.emaildomain.findUnique({
      where: emaildomainWhereUniqueInput,
    })
  }

  async isEmailDomainAccepted(domain: string): Promise<boolean> {
    // Verify the domain for the email is an accepted one
    let isAccepted = false;
    const result= await this.findOneUnique({domain: domain})
    if(result === null) {
      // Look within the .env file
      isAccepted = (this.configService.get<string>("EMAIL_ALLOWED_DOMAIN") === domain);
      return isAccepted
    }
    !result?.allowed  ? isAccepted = false  : isAccepted = true
    return isAccepted
  }

}
