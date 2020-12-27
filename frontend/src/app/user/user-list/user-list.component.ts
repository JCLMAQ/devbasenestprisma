import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  dataSource?: MatTableDataSource<User>;
  tableColumns  :  string[] = [ 'nickName', 'lastName', 'firstName'] //, 'tools'];
  users?: User[];
  constructor(
    private userService: UserService
    ) {
      this.userService.getAllUsers().subscribe((objectResult) => {
        console.log('objectResult', objectResult);
        const arrayResult = Object.values(objectResult)
        console.log('arrayResult ', arrayResult)
        this.users = arrayResult;
        this.dataSource  =  new MatTableDataSource(objectResult);
        console.log('Datasource: ',this.dataSource)
        })


    }

  ngOnInit(): void {

  }

  // users$ = this.userService.getAllUsers();


}
