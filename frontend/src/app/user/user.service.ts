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
    const result = this.httpClient.get<User[]>('api/usersbis/allusers');
    // const result = makeIterable(this.httpClient.get<User[]>('api/users/allusers'));
    console.log("user service: all users result: ", result)
    const result1 = JSON.stringify(result)
    console.log("user service: all users result JSON strintify: ", result1)
    return result
  }

  async getOneUser(id: string): Promise<User> {
    const result = await this.httpClient.get<User>(`api/usersbis/oneuser/${id}`).toPromise();;
    console.log(result);
    // const resultArray = Object.values(result)
    // console.log(resultArray);
    return result;
  }
}
