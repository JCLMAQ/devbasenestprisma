import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICurrentUser, ILoginResponse, IJwt} from '../auth.model';
import  jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: string;
  currentUser$: BehaviorSubject<ICurrentUser | null> = new BehaviorSubject<ICurrentUser | null>(null);
  // currentUser: BehaviorSubject<ICurrentUser | null> = new BehaviorSubject(null);


  constructor(
    private httpClient: HttpClient,

  ) {
    // this.currentUser$ = new BehaviorSubject<ICurrentUser | null>(null)
    this.authToken = localStorage.authJwtToken || '';
    // this.fetchUser();
  }


  async fetchUser(): Promise<any> {
    // const decodedJwt: Object | null = jwt_decode(this.authToken);
    //   console.log(decodedJwt);
    //  get user data from backend with authToken
    if (this.authToken) {
      const decodedJwt: IJwt = jwt_decode(this.authToken);
      // console.log("decodedJWT: ", decodedJwt);
      const emailToCheck = decodedJwt.username;

      const { fullName } = await this.httpClient.post<ICurrentUser>('api/auths/checkCredential/', { emailToCheck }).toPromise();
      // console.log("fullName from fetch user: ", fullName);
      if (!fullName) {
        this.currentUser$.next(null);
      } else {
        this.currentUser$.next({
          username: decodedJwt.username,
          fullName,
        });
      }
    } else {
      this.currentUser$.next(null);
    }
  }
  async refreshUser() {
    // this.roles = {};
    // this.wakandaService.refreshUser();
    // const u = await this.wakandaService.user;
    // this.currentUser$.next(u);
    // return u;
  }

  async login(email: string, password: string): Promise<boolean> {
    let isOK = false;
    try {
      // const { authJwtToken, user } = await this.httpClient.post<ILoginResponse>('api/auth/login/', { username, password }).toPromise();
      const { access_token, fullName , role } = await this.httpClient.post<ILoginResponse>('api/auths/auth/loginwithpwd', { email, password }).toPromise();

      localStorage.authJwtToken = access_token;
      // isOK = (!!authJwtToken);
      isOK = (!!access_token);
      // console.log("Retour login: ", isOK, email, fullName)
      if (isOK) {
        this.fetchUser();
        const test =  this.currentUser$.next({
          username: email,
          fullName: fullName,
        });
        // console.log("currentUser: ", test )
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
      const { user, authJwtToken } = await this.httpClient.post<any>('api/auths/auth/logoutwithpwd', '').toPromise();
      isOK = (!authJwtToken) && (!user)
      if (isOK) { this.currentUser$.next(null) }
    } catch (e) {
      isOK = false;
    }
    // if (isOK) {
    //   this.refreshUser();
    // }
    return isOK;
  }

}
