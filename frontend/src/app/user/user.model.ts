
export class User {
  id?: string
  createdAt?: Date
  updatedAt?: Date
  numSeq?: number
  email?: string
  Role?: string
  nickName?: string
  title?: string
  profiles?: Array<string>
  lastName?: string
  firstName?: string
  address?: JSON
  Gender?: string
  manager?: string
  team?: Array<string>
  groups?: Array<string>
  posts?: Array<string>
  comments?: Array<string>
  todos?: Array<string>
  dob?: Date
  isDeleted?: Date
}

export interface IUserRegister {
  email: string;
  password: string;
  confirmPassword: string;
  lastName?: string;
  firstName?: string;
  title?: string;
  role: Role;
}

export enum Role {
  User = 'User',
  Admin = 'Admin'
}
// export class User {
//   id: string | undefined;
//   createdAt: Date | undefined;
//   updatedAt: Date | undefined;
//   numSeq: number | undefined;
//   email: string | undefined;
//   Role: string | undefined;
//   nickName: string | undefined;
//   profiles: Array<string> | undefined;
//   lastName: string | undefined;
//   firstName: string | undefined;
//   Gender: string | undefined;
//   manager: string | undefined;
//   team: Array<string> | undefined;
//   groups: Array<string> | undefined;
//   posts: Array<string> | undefined;
//   comments: Array<string> | undefined;
//   todos: Array<string> | undefined;
//   isDeleted: Date | undefined;
//   constructor() {
//     this.firstName = '';
// }
// }

export interface ILoginResponse {
// authJwtToken: string;
// user: User;
access_token: string;
fullName:string;
}
