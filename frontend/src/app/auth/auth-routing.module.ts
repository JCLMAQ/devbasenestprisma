import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const authRoutes: Routes = [
  { path: 'login', component: LoginComponent,
      // resolve: {
      //   auths: AuthResolver
      // }
    },
    { path: 'register', component: RegisterComponent,
      // resolve: {
      //   auths: AuthResolver
      // }
    },
    { path: 'forgotpwd', component: ForgotpwdComponent,
      // resolve: {
      //   auths: AuthResolver
      // }
    },
    { path: '', component: LoginComponent,
        // resolve: {
        //   auths: AuthResolver
        // }
      },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
