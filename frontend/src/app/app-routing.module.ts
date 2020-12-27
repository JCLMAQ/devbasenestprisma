import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const mainRoutes: Routes = [
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  { path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule) }];

@NgModule({
  imports: [RouterModule.forRoot(mainRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
