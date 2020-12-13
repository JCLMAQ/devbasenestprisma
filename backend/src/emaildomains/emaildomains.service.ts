import { Injectable } from '@nestjs/common';
import { CreateEmaildomainDto } from './dto/create-emaildomain.dto';
import { UpdateEmaildomainDto } from './dto/update-emaildomain.dto';

@Injectable()
export class EmaildomainsService {
  create(createEmaildomainDto: CreateEmaildomainDto) {
    return 'This action adds a new emaildomain';
  }

  findAll() {
    return `This action returns all emaildomains`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emaildomain`;
  }

  update(id: number, updateEmaildomainDto: UpdateEmaildomainDto) {
    return `This action updates a #${id} emaildomain`;
  }

  remove(id: number) {
    return `This action removes a #${id} emaildomain`;
  }
}
