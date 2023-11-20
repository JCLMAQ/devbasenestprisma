import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LetDirective } from '@ngrx/component';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { StoreModule } from '@ngrx/store';
import { OnlyOneErrorPipe } from '../pipes/only-one-error.pipe';

import { UserDataService } from '../user/store/user-data.service';
import { AuthRoutingModule } from './auth-routing.module';
import { ChangepwdComponent } from './changepwd/changepwd.component';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetpwdComponent } from './resetpwd/resetpwd.component';
import { AuthService } from './services/auth.service';
import { ChangePwdService } from './services/changepwd.service';
import { RegisterService } from './services/register.service';
import * as fromAuth from './store/reducers';
import { YourprofilComponent } from './yourprofil/yourprofil.component';

const entityMetadata: EntityMetadataMap = {
  Auth: {
 },
};

export const entityConfig = {
  entityMetadata
};
@NgModule({
    imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
    LetDirective,
    LoginComponent,
    ChangepwdComponent,
    ForgotpwdComponent,
    RegisterComponent,
    ResetpwdComponent,
    YourprofilComponent,
    OnlyOneErrorPipe
],
    // entryComponents: [
    //   LoginComponent,
    //   RegisterComponent,
    //   ChangepwdComponent,
    //   ForgotpwdComponent,
    //   ResetpwdComponent,
    //   YourprofilComponent
    // ],
    providers: [
        AuthService,
        RegisterService,
        ChangePwdService
    ]
})
export class AuthModule {

  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        RegisterService,
        ChangePwdService
      ]
    }
  }
  constructor(
    private entityDefinitionService: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private userDataService: UserDataService,
  ) {
    entityDefinitionService.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Auth', userDataService)

  }
}

