export class User {
  id?: string
  createdAt?: Date
  updatedAt?: Date
  numSeq?: number
  email?: string
  Role?: string
  nickName?: string
  profiles?: Array<string>
  lastName?: string
  firstName?: string
  Gender?: string
  manager?: string
  team?: Array<string>
  groups?: Array<string>
  posts?: Array<string>
  comments?: Array<string>
  todos?: Array<string>
  isDeleted?: Date
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
