import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UsersbisService } from './usersbis.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { 
  User as UserModel,
  Prisma,
} from '@prisma/client';
import { UserBis } from './entities/userbis.entity';

@Controller('usersbis')
export class UsersbisController {
  constructor(
    private readonly usersbisService: UsersbisService) {}

  @Get('allusers')
  async getAllUsers(): Promise<UserBis> {
    // return this.usersbisService.findUsers({});
    const result = await this.usersbisService.findUsers({include: { Profile: true, }} );
    console.log("result include: ", result)
    return result
  }

}