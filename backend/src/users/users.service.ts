import { Injectable } from '@nestjs/common';
import {
  Prisma, User
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
/*
The following example uses the Prisma.validator to create two type-safe objects and then uses the Prisma.UserGetPayload utility function 
to create a type that can be used to return all users and their posts.
*/

// 1: Define a type that includes the relation to `Post`
const userWithPosts = Prisma.validator<Prisma.UserArgs>()({
  include: { Post: true },
})

// 2: Define a type that only contains a subset of the scalar fields
const userPersonalData = Prisma.validator<Prisma.UserArgs>()({
  select: { email: true, nickName: true ,  salt: false, pwdHash: false },
})

// 3: This type will include a user and all their posts
type UserWithPostsbis = Prisma.UserGetPayload<typeof userWithPosts>

// Define a type that includes the relation to `Post` for users
type UsersWithPosts = Prisma.PromiseReturnType<typeof getUsersWithPostsFunct>;
//  https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types

// Function definition that returns a partial structure
async function getUsersWithPostsFunct() {
  const usersWithPosts = await this.prisma.user.findMany({ include: { Post: true } })
  return usersWithPosts
}

// Define a type that includes the relation to `Post` for one user
type UserWithPosts = Prisma.UserGetPayload<{
  include: { Post: true, salt: false, pwdHash: false }
}>

// Define a type that only contains a subset of the scalar fields
type UserPersonalData = Prisma.UserGetPayload<{
  select: {email: true; lastName: true; firstName: true; nickName: true}
}>

type UserWithoutSecret = Prisma.UserGetPayload<{
  select: {pwdHash: false, salt: false }
}>

// Select generated type
const selectUserWithEmail = Prisma.validator<Prisma.UserSelect>()({
  email: true
})
// Include generated type
const includePosts = Prisma.validator<Prisma.UserInclude> () ({
  Post: true,
})

const findSpecificUserByEmail = (email: string) => {
  return Prisma.validator<Prisma.UserWhereInput>()({
    email,
  })
}

type UserWithoutPwd =  Omit<User, "salt" | "pwdHash">;

@Injectable()
export class UsersService {
  

  constructor(
    private prisma: PrismaService,
  ) {}
  


// Find the specific user based on email
async findOneUserByEmail(userEmailToSearch: string ): Promise<UserPersonalData> {
  const oneUser = await this.prisma.user.findUnique({
    where: findSpecificUserByEmail(userEmailToSearch),
  })
  return oneUser
}


  async getUsersWithPosts(): Promise<UsersWithPosts> {
    const usersWithPosts: UsersWithPosts = await getUsersWithPostsFunct()
    return usersWithPosts
  }


  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    if(!data.Roles) { data.Roles = "USER" };
    return await this.prisma.user.create({
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
    orderBy?: Prisma.UserMaxOrderByAggregateInput;
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

  async getOneUserByEmail(userEmail: string): Promise<User> {
    return await this.prisma.user.findUnique({
        where: { email: userEmail }
    })
  } 

  async getOneUserByEmailwithoutPwd(userEmail: string): Promise<UserWithoutPwd> {
    const user = await this.prisma.user.findUnique({
      where: { email: userEmail }
  })
  // const userWithoutPassword = exclude(user, 'pwdHash', 'salt')
    return user
  } 


  async findOrCreateOneUser(email: string): Promise<User> { // If user does not exist, create one
    let user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) {
      // Create a new user
      user = await this.prisma.user.create({ data: { email: email },})
    }
      return user; 
  }
  async createOneUserWithPwd(userData:Prisma.UserCreateInput, pwdHash: string, salt: string): Promise<boolean> {
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

  async returnUserPartial(userEmail: string) {
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

  async userStillExist(userEmail: string) : Promise<Prisma.UserCreateInput> {
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

  async userExist(userEmail: string): Promise<boolean>{
    let result = false;
    const userExist = await this.getOneUserByEmail(userEmail);
    if(userExist != null) {
      result = true
    }
    return result;
  }

  



}

