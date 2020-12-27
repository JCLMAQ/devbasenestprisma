import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  getAllUsers(): Observable<User[]>{
    const result = this.httpClient.get<User[]>('api/users/allusers');
    console.log(result)
    return result
    // return this.httpClient.get<User[]>('http://localhost:3000/Users');
  }
}
