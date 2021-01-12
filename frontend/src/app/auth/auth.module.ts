import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { ChangepwdComponent } from './changepwd/changepwd.component';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';
import { RegisterComponent } from './register/register.component';
import { ResetpwdComponent } from './resetpwd/resetpwd.component';
import { ProfilComponent } from './profil/profil.component';
import { RegisterService } from './register.service';
import { ChangePwdService } from './changepwd.service';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EntityDefinitionService, EntityDataService, EntityMetadataMap } from '@ngrx/data';
import { UserDataService } from '../user/store/user-data.service';
import { OnlyOneErrorPipe } from './pipes/only-one-error.pipe';

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
    ProfilComponent,
    OnlyOneErrorPipe
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers)
  ],
  providers: [
    AuthService,
    RegisterService,
    ChangePwdService
  ]
})
export class AuthModule {

  constructor(
    private entityDefinitionService: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private userDataService: UserDataService,
  ) {
    entityDefinitionService.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Auth', userDataService)

  }
}

