import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  // users$?: Observable<User[]>;
users?: User[];
  constructor(
    private userService: UserService
    ) {
      this.userService.getAllUsers().subscribe((objectResult) => {
        console.log('objectResult', objectResult);
        const arrayResult = Object.values(objectResult)
        console.log('arrayResult ', arrayResult)
        this.users = arrayResult;
        // this.dataSource  =  new MatTableDataSource(result);
        })
      // const users$ = this.userService.getAllUsers();
      // console.log(users$)

     }

  ngOnInit(): void {

  }

  // users$ = this.userService.getAllUsers();


}
