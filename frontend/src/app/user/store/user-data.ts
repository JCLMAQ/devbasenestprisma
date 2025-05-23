export interface UserData {
  id: string | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  numSeq: number | undefined;
  email: string | undefined;
  Role: string | undefined;
  nickName: string | undefined;
  profiles: Array<string> | undefined;
  lastName: string | undefined;
  firstName: string | undefined;
  Gender: string | undefined;
  manager: string | undefined;
  team: Array<string> | undefined;
  groups: Array<string> | undefined;
  posts: Array<string> | undefined;
  comments: Array<string> | undefined;
  todos: Array<string> | undefined;
  isDeleted: Date | undefined;
  dob: Date | undefined;
}
