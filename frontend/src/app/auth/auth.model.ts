export interface IUserRegister {
  email: string;
  password: string;
  confirmPassword: string;
  lastName?: string;
  firstName?: string;
  nickName?: string;
  title?: string;
  gender?: string;
  role?: string;
}

export interface ICurrentUser {
  email: string;
  lastName?: string;
  firstName?: string;
}

export interface ILoginResponse {
  // authJwtToken: string;
  // user: User;
  access_token: string;
  nickName:string;
}

export interface ICurrentUser {
  email: string;
  nickName?: string;
}

export interface IForgotEmail {
  message: string;
  success: boolean;
}

