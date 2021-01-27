import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { ChangepwdComponent } from './changepwd/changepwd.component';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';
import { RegisterComponent } from './register/register.component';
import { ResetpwdComponent } from './resetpwd/resetpwd.component';
import { ChangePwdService } from './services/changepwd.service';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './store/reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EntityDefinitionService, EntityDataService, EntityMetadataMap } from '@ngrx/data';
import { UserDataService } from '../user/store/user-data.service';
import { OnlyOneErrorPipe } from '../pipes/only-one-error.pipe';
import { ReactiveComponentModule } from '@ngrx/component';
import { RegisterService } from './services/register.service';
import { YourprofilComponent } from './yourprofil/yourprofil.component';

const entityMetadata: EntityMetadataMap = {
  Auth: {
 },
};

export const entityConfig = {
  entityMetadata
};
@NgModule({
  declarations: [
    LoginComponent,
    ChangepwdComponent,
    ForgotpwdComponent,
    RegisterComponent,
    ResetpwdComponent,
    YourprofilComponent,
    OnlyOneErrorPipe
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
    ReactiveComponentModule
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent,
    ChangepwdComponent,
    ForgotpwdComponent,
    ResetpwdComponent,
    YourprofilComponent
  ],
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

