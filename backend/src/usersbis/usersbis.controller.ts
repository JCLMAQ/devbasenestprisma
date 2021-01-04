import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UsersbisService } from './usersbis.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { 
  User as UserModel,
  Prisma,
  Role
} from '@prisma/client';
import { domain } from 'process';
import { UserBisPersonalData } from './entities/userbis.entity';

@Controller('usersbis')
export class UsersbisController {
  constructor(private readonly usersbisService: UsersbisService) {}

  @Get('allusers')
  async getAllUsers(): Promise<UserBisPersonalData[]> {
    return this.usersbisService.findUsers({});
  }

}