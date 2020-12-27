import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';

import { UserComponent } from './user.component';

const userRoutes: Routes = [
 { path: '', component: UserComponent,//},
  // { path: 'users', component: UserComponent,
      children: [
            { path: 'list', component: UserListComponent},
          ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
