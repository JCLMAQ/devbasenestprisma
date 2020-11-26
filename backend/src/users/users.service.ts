import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  User,
  Prisma
} from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(
    private prisma: PrismaService,
  ) {}
  
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async findSomeUsers(params: Prisma.FindManyUserArgs
  ): Promise<any> {
    const { select, include ,skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      select,
      include,
      where,
      orderBy,
      cursor,
      take,
      skip, 
     });
  }

  async findUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy} = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findUniqueUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async getOneUserByEmail(userEmail): Promise<User> {
    return await this.prisma.user.findUnique({
        where: { email: userEmail }
    })
  } 

  async findOrCreateOneUser(email: string): Promise<User> { // If user does not exist, create one
    let user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) {
      // Create a new user
      user = await this.prisma.user.create({ data: { email: email },})
    }
      return user; 
  }
  async updateOneUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteOneUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async returnUserPartial(userEmail) {
    const user = await this.getOneUserByEmail(userEmail);
    // const { pwdHash, salt, ...result } = user; // To remove pwdHash and salt from user: result = user less salt and pwdHash
    const { pwdHash, salt, isAdmin, ...result } = user;
console.log('UserStillExist : yes', result)
    return result;
  }

  async userExistOrCreate(email: string): Promise<User> { // If user does not exist, create one
    let user = await this.prisma.user.findUnique({ where: { email } })
    // if (!user) throw new HttpException('User not found', 400);
    if (!user) {
      // Create a new user
      user = await this.prisma.user.create({ data: { email }})
    }
      return user; // return the new user or the found user
  }

  async userStillExist(userEmail) {
    const user = await this.getOneUserByEmail(userEmail);
    // Verify the user is not soft deleted !!!
    if(!user || user.isDeleted){
console.log('UserStillExist : non (or soft deleted: ')
      return null // Soft deleted or user does not exist
    }
    const { pwdHash, salt, ...result } = user;
    // const { ...result } = user;
console.log('UserStillExist : yes', result)
    return result;
  }

}

