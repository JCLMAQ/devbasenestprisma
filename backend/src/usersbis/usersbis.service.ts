import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Prisma,
  UserBis
} from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class UsersbisService {

  constructor(
    private prisma: PrismaService,
  ) {}

  async findUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserBisWhereUniqueInput;
    where?: Prisma.UserBisWhereInput;
    orderBy?: Prisma.UserBisOrderByInput;
    select?: Prisma.UserBisSelect;
  }): Promise<UserBis[]> {
    const { skip, take, cursor, where, orderBy} = params;
    return this.prisma.userBis.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async allUsers(): Promise<UserBis[]> {
    return this.prisma.userBis.findMany()
  }
}

