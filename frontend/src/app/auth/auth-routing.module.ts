import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const authRoutes: Routes = [
  { path: 'login', component: LoginComponent,
      // resolve: {
      //   auths: AuthResolver
      // }
    },
  { path: '', component: LoginComponent,
      // resolve: {
      //   authss: AuthResolver
      // }
    },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
