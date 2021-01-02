import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';

import { UserComponent } from './user.component';
import { UserResolver } from './user.resolver';

const userRoutes: Routes = [
  { path: 'userdetail/:id/view', component: UserDetailComponent },
  { path: 'userdetail', component: UserDetailComponent },
  { path: 'users', component: UserListComponent,
      resolve: {
        users: UserResolver
      }},
  { path: '', component: UserComponent,
      resolve: {
        users: UserResolver
      }},


      // children: [
      //   { path: 'users', component: UserListComponent},
      //   { path: 'list', component: UserListComponent},
      //   { path: 'detail', component: UserDetailComponent}
      //   // { path: 'detail/:id/view', component: UserDetailComponent,
      //   //     data: { editbutton: false, owner: false , master: false }
      //   // },

      // ]
  // },

];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
