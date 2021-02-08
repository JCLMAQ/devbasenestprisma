import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  User,
  Prisma, 
} from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { randomBytes } from 'crypto';

type UsersWithPosts = Prisma.PromiseReturnType<typeof getUsersWithPosts>;

async function getUsersWithPosts() {
  const users = await this.prisma.user.findMany({ include: { Post: true } })
  return users
}

// Define a type that includes the relation to `Post`
type UserWithPosts = Prisma.UserGetPayload<{
  include: { Post: true; salt: false; pwdHash: false }
}>

// Define a type that only contains a subset of the scalar fields
type UserPersonalData = Prisma.UserGetPayload<{
  select: { email: true; lastName: true; firstName: true; nickName: true }
}>
@Injectable()
export class UsersService {
  

  constructor(
    private prisma: PrismaService,
  ) {}
  
  async getUsersWithPosts(): Promise<UsersWithPosts> {
    const usersWithPosts: UsersWithPosts = await getUsersWithPosts()
    return usersWithPosts
  }


  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    if(!data.Roles) { data.Roles = "USER" };
    return this.prisma.user.create({
      data,
    });
  }

  async findSomeUsers(params: Prisma.UserFindManyArgs
  ): Promise<User[]> {
    const { select, include ,skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
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
    select?: Prisma.UserSelect;
    include?: Prisma.UserInclude;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy, select, include} = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include
    });
  }

  async allUsers(): Promise<User[]> {
    return this.prisma.user.findMany()
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
  async createOneUserWithPwd(userData:Prisma.UserCreateInput, pwdHash, salt): Promise<boolean> {
    // async createOneUser(userData): Promise<User> {
    let userCreatedStatute = false;
    const fullName = userData.firstName + ' ' + userData.lastName;
    // WARNING A new User is always created as a USER, should be by default "GUEST" ?

    if(!userData.Roles) { userData.Roles = 'USER';}
    // const Role = 'USER';
    const result = await this.prisma.user.create({
        data: {
            salt,
            pwdHash,
            email: userData.email,
            nickName: userData.nickName,
            lastName: userData.lastName,
            firstName: userData.firstName,
            Gender: userData.Gender,
            Roles: userData.Roles
            // manager: userData.manager
            //  manager: { connect: {email: userData.managerId} }
        }
    });
    if (!!result) { userCreatedStatute = true; }
    // return resultbis;
    return userCreatedStatute;
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
    return result;
  }

  async userExistOrCreate(email: string): Promise<User> { // If user does not exist, create one
    let user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) {
      // Create a new user
      user = await this.prisma.user.create({ data: { email }})
    }
      return user; // return the new user or the found user
  }

  async userStillExist(userEmail) {
    const user = await this.getOneUserByEmail(userEmail);
    // Verify the user is not soft deleted !!!
    if( !user) {
      return null;
    }
    if(user?.isDeleted != null){ // a date exist witch mean that the user is soft deleted
      return null // Soft deleted or user does not exist
    }
    const { pwdHash, salt, ...result } = user;
    // const { ...result } = user;
    return result;
  }

  async userExist(userEmail) {
    let result = false;
    const userExist = await this.getOneUserByEmail(userEmail);
    if(userExist != null) {
      result = true
    }
    return result;
  }

  



}

