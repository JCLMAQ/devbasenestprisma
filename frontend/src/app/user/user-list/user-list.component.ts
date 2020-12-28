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
export class UserListComponent implements OnInit {
  dataSource!: MatTableDataSource<User>;
  tableColumns  :  string[] = [ 'nickName', 'lastName', 'firstName', 'email'];
  users?: User[];
  paginator?: MatPaginator;
  sort?: MatSort

  // @ViewChild(MatPaginator , { static: false }) paginator: MatPaginator;;

  @ViewChild(MatPaginator, { static: true }) set matPaginator(mp: MatPaginator) {
    if (mp !== undefined && this.dataSource) {
      this.paginator = mp;
      this.dataSource.paginator = this.paginator;
    }
  }
  @ViewChild(MatSort , { static: false }) set matSort(ms: MatSort) {
    if (ms !== undefined && this.dataSource) {
      this.sort = ms;
      this.dataSource.sort = this.sort;
    }
  }
  constructor(
    private userService: UserService,
    private router: Router,
    ) {

      this.userService.getAllUsers().subscribe((objectResult) => {
        console.log('objectResult', objectResult);
        const arrayResult = Object.values(objectResult)
        console.log('arrayResult ', arrayResult)
        this.users = arrayResult;
        console.log('users ', this.users);
        this.dataSource  =  new MatTableDataSource(arrayResult);
        console.log('Datasource: ',this.dataSource);
        });

    }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // private paginator: MatPaginator;
    // private sort: MatSort;
    // this.dataSource.paginator = this.paginator;
  }

}

