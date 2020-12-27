import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [UserComponent, UserListComponent, UserDetailComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule
  ]
})
export class UserModule { }
