import { Injectable } from '@nestjs/common';
import { Emaildomain, Prisma, EmaildomainSelect} from '@prisma/client';
import { object } from 'joi';
import { domain } from 'process';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmaildomainDto } from './dto/create-emaildomain.dto';
import { UpdateEmaildomainDto } from './dto/update-emaildomain.dto';

@Injectable()
export class EmaildomainsService {

  constructor(
    private prisma: PrismaService,
  ) {}

  async findOneUnique(emaildomainWhereUniqueInput: Prisma.EmaildomainWhereUniqueInput): Promise<Emaildomain | null> {
    return this.prisma.emaildomain.findUnique({
      where: emaildomainWhereUniqueInput,
    })
  }

  async isEmailDomainAccepted(domain: string): Promise<boolean> {
    const result= await this.findOneUnique({domain: domain})
    if (!result?.allowed)  {return false }
    return true
  }

  async createArrayOfAllowedDomain(){
    let allowedDomains = [];
    const allowed = await this.prisma.emaildomain.findMany({
      where: { allowed: true },
      select: { domain: true }
    })
    allowedDomains.push(allowed)
console.log("Allowed domains allowed: ", allowedDomains)
    allowedDomains = Object.values(allowed);
console.log("Allowed domains allowed: ", allowedDomains)   
  }
}
