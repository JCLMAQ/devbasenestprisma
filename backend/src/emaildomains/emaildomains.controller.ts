import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { EmaildomainsService } from './emaildomains.service';
import { CreateEmaildomainDto } from './dto/create-emaildomain.dto';
import { UpdateEmaildomainDto } from './dto/update-emaildomain.dto';

@Controller('emaildomains')
export class EmaildomainsController {
  constructor(private readonly emaildomainsService: EmaildomainsService) {}

  @Post()
  create(@Body() createEmaildomainDto: CreateEmaildomainDto) {
    return this.emaildomainsService.create(createEmaildomainDto);
  }

  @Get()
  findAll() {
    return this.emaildomainsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emaildomainsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEmaildomainDto: UpdateEmaildomainDto) {
    return this.emaildomainsService.update(+id, updateEmaildomainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emaildomainsService.remove(+id);
  }
}
