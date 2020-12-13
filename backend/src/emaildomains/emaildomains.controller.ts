import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { EmaildomainsService } from './emaildomains.service';
import { CreateEmaildomainDto } from './dto/create-emaildomain.dto';
import { UpdateEmaildomainDto } from './dto/update-emaildomain.dto';

@Controller('emaildomains')
export class EmaildomainsController {
  constructor(private readonly emaildomainsService: EmaildomainsService) {}

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.emaildomainsService.findOneUnique({id: +id});
  }
  @Get(':id')
  findOneByDomain(@Param('domain') domain: string) {
    return this.emaildomainsService.findOneUnique({domain});
  }
}
