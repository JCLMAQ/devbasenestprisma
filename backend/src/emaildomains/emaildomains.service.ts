import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Emaildomain, Prisma } from '../../prisma/index';
import { PrismaClientService } from '../prisma/prisma-client.service';

@Injectable()
export class EmaildomainsService {

  constructor(
    private prismaClientService: PrismaClientService,
    private configService: ConfigService,
  ) {}

  async findOneUnique(emaildomainWhereUniqueInput: Prisma.EmaildomainWhereUniqueInput): Promise<Emaildomain | null> {
    return this.prismaClientService.emaildomain.findUnique({
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
