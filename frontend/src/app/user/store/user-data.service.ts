import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DefaultDataService,
  HttpUrlGenerator
} from '@ngrx/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user.model';

@Injectable({ providedIn: 'root' })

export class UserDataService extends DefaultDataService<User> {


    constructor(
      private httpClient :HttpClient,
      httpUrlGenerator: HttpUrlGenerator
      ) {
        super('User', httpClient, httpUrlGenerator);
      }


//     getAll(): Observable<User[]> {
//       const result =  this.httpClient.get<User[]>('/api/users/allusers')
//        .pipe(
//         map(res => res)
//     );
//     console.log("result back", result)
// return result
    // }
}
