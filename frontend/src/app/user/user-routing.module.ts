import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserResolver } from './store/user.resolver';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { UserComponent } from './user.component';
// import { UserResolver } from './store/user.resolver';

const userRoutes: Routes = [

  { path: 'userprofile/:id/:mode', component: UserProfileComponent },
  { path: 'users', component: UserListComponent,
      resolve: {
        users: UserResolver
      }},
  { path: '', component: UserListComponent,
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
