import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    imports: [UserListComponent, RouterOutlet]
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
