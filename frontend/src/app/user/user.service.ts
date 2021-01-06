import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
import makeIterable from "@lopatnov/make-iterable";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  getAllUsers(): Observable<User[]>{
    const result = this.httpClient.get<User[]>('api/users/allusers');
    return result
  }

  async getOneUser(id: string): Promise<User> {
    const result = await this.httpClient.get<User>(`api/users/oneuser/${id}`).toPromise();;
    console.log(result);
    // const resultArray = Object.values(result)
    // console.log(resultArray);
    return result;
  }
}
