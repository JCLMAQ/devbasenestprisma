export interface IUserRegister {
  email: string;
  password: string;
  confirmPassword: string;
  lastName?: string;
  firstName?: string;
}

export interface ICurrentUser {
  email: string;
  lastName?: string;
  firstName?: string;
}
