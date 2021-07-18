import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiBearerAuth, ApiOperation, ApiResponse, ApiTags
} from '@nestjs/swagger';
import {
  Prisma
} from '@prisma/client';
// import { domain } from 'process';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';



@ApiBearerAuth()
@ApiTags('users')
@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService) {}

   // Create a new user
  @Post('user')
  @ApiOperation({ summary: 'Create cat' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })

  async createOneUser( @Body() userData: Prisma.UserCreateInput ): Promise<User> {
    // const { name, email } = userData;
    return this.usersService.createUser(
      userData
    );
  }

  @Get('allusersbis')
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: User,
  })
  async getAllUsersbis(): Promise<User[]> {
    const users = this.usersService.findUsers({ select: { lastName: true}
    });

    return users;
  }

  // @Get('allusers')
  // async getAllUsers(): Promise<User> {
  //  // return this.usersbisService.findUsers({});
  //  const result = await this.usersService.findUsers({include: { Profile: true, }} );
  //  console.log("result include: ", result)
  //  return result
  // }
  @Get('users')
  async getAllUsers(): Promise<User> {
    // return this.usersbisService.findUsers({});
    // const result = await this.usersService.findUsers({include: { manager: true, Team: true, Todo: true, Group: true, Comment: true, Profile: true, }} );
    const result = await this.usersService.findUsers({});
    return result
  }

  @Get('someusers')
  async getSomeUsers( @Body() findParams: Prisma.UserFindManyArgs ): Promise<User[]> {
    const show = {
    id: true,
    createdAt: true,
    updatedAt: true,
    email: true,
    Role: true,
    nickName: true,
    lastName: true,
    firstName: true,
    Gender: true,
    isDeleted: true,
    isSuspended: true,
    isValidated: true,
    Team: {
        select: {
            lastName: true,
            firstName: true,
            email: true,
        }
    },
    manager: {
        select: {
            lastName: true,
            firstName: true,
            email: true,
        }
    },
    Post: true,
    Comment: true,
    Todo: true,
    Group: true
    }
  return this.usersService.findSomeUsers({
    select: show
    });
  }

    // Get one user by id
    @Get('user/:id')
    async getUserById(@Param('id') id: string): Promise<User> {
      return this.usersService.findUniqueUser({ id: String(id) });
    }

  // Update one user
  @Put('user/:id')
  async updateUser(
    @Param('id') id: string,
    // @Body() postData: { title: string; content?: string; authorEmail: string }): Promise<PostModel> {
    @Body() userData: Prisma.UserUpdateInput): Promise<User> {
      // console.log("Date dob: ", userData.dob);
    return this.usersService.updateOneUser({
      where: { id: String(id) },
      data:  userData ,
    });
  }

  // Research user
  @Get('filtered-users/:searchString')
  async getFilteredUsers(
    @Param('searchString') searchString: string,
  ): Promise<User[]> {
    return this.usersService.findUsers({
      where: {
        OR: [
          {
            firstName: { contains: searchString },
          },
          {
            lastName: { contains: searchString },
          },
          {
            email: { contains: searchString },
          },
        ],
      },
    });
  }

  // Delete one user
  // TODO ! Cascading delete for Post
  // TODO ! ADD : ADMIN privilège needed
  @Delete('deleteoneuser/:id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteOneUser({ id: String(id) });
  }
}