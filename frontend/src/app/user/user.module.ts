import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromUser from './user.reducer';
// import * as fromUser from './reducers';
import { UserResolver } from './user.resolver';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './user.effects';
import { userReducer } from './user.reducer';
// import * as fromUser from './user.reducer';


@NgModule({
  declarations: [UserComponent, UserListComponent, UserDetailComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([UsersEffects]),
    // StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducers, { metaReducers: fromUser.metaReducers })
    StoreModule.forFeature("users", userReducer),
    // StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer)
  ],
  exports: [],
  providers: [
    UserResolver,
  ]
})
export class UserModule { }
