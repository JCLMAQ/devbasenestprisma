import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICurrentUser, ILoginResponse } from '../auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: string;
  currentUser!: BehaviorSubject<ICurrentUser | null>;
  // currentUser!: BehaviorSubject<ICurrentUser | null> = new BehaviorSubject(null);


  constructor(
    private httpClient: HttpClient,

  ) {
    this.authToken = localStorage.authJwtToken || '';
  }

  async login(username: string, password: string): Promise<boolean> {
    let isOK = false;
    try {
      // const { authJwtToken, user } = await this.httpClient.post<ILoginResponse>('api/auth/login/', { username, password }).toPromise();
      const { access_token, nickName } = await this.httpClient.post<ILoginResponse>('api/auths/auth/loginwithpwd', { username, password }).toPromise();
      localStorage.authJwtToken = access_token;
      // isOK = (!!authJwtToken);
      isOK = (!!access_token);
      if (isOK) {
        // this.refreshUser();
        this.currentUser.next({
          email: username,
          nickName,
        });
      }
    } catch (e) {
      isOK = false;
    }
    return isOK;
  }

  async logout(): Promise<boolean> {
    let isOK = false;
    // Send the logout to the backend
    try {
      const { user, authJwtToken } = await this.httpClient.post<any>('api/auth/logout', '').toPromise();
      isOK = (!authJwtToken) && (!user)
      if (isOK) { this.currentUser.next(null) }
    } catch (e) {
      isOK = false;
    }
    // if (isOK) {
    //   this.refreshUser();
    // }
    return isOK;
  }

}
