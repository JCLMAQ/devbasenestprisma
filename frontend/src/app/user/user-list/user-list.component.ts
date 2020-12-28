import { SelectionModel } from '@angular/cdk/collections';

import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit{
  dataSource: MatTableDataSource<User>;
  tableColumns  :  string[] = [ 'nickName', 'lastName', 'firstName', 'email'];
  users?: User[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private userService: UserService,
    private router: Router,
    ) {    }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((objectResult) => {
      console.log('objectResult', objectResult);
      const arrayResult = Object.values(objectResult)
      console.log('arrayResult ', arrayResult)
      this.users = arrayResult;
      console.log('users ', this.users);
      this.dataSource  =  new MatTableDataSource(arrayResult);
      console.log('Datasource: ',this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

}
