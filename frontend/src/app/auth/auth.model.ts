export interface IUserSignup {
  lastName?: string;
  firstName?: string;
  email: string;
  password: string;
  verifyPassword: string;
}

export interface ICurrentUser {
  email: string;
  fullName?: string;
}
