import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { 
  User as UserModel,
  UserCreateInput, 
  UserUpdateInput
} from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

   // Create a new user
   @Post('newUser')
   async createOneUser( @Body() userData: UserCreateInput ): Promise<UserModel> {
     // const { name, email } = userData;
     return this.usersService.createUser(
       userData
     );
   }
 
   @Get('allusers')
   async getAllUsers(): Promise<UserModel[]> {
     return this.usersService.findUsers({});
   }

    // Get one user by id
    @Get('oneuser/:id')
    async getUserById(@Param('id') id: string): Promise<UserModel> {
      return this.usersService.findOneUser({ id: Number(id) });
    }

  // Update one user
  @Put('updateoneuser/:id')
  async updatePost(
    @Param('id') id: string,
    // @Body() postData: { title: string; content?: string; authorEmail: string }): Promise<PostModel> {
    @Body() userData: UserUpdateInput): Promise<UserModel> {
    return this.usersService.updateOneUser({
      where: { id: Number(id) },
      data:  userData ,
    });
  }

  // Research user
  @Get('filtered-users/:searchString')
  async getFilteredUsers(
    @Param('searchString') searchString: string,
  ): Promise<UserModel[]> {
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
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.deleteOneUser({ id: Number(id) });
  }
}