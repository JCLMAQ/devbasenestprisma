import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';

import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '', component: UsersListComponent ,
    // children: [
    //   // { path: 'list', component: UsersListComponent}
    //   { path: 'users', loadChildren: () => import('./users-list/users-list.component').then(m => m.UsersListComponent)},
    // ]
  },
  { path: 'users', component: UsersListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
