import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { SharedModule } from '../shared/shared.module';
import { UserDataService } from './store/user-data.service';
import { UserEntityService } from './store/user-entity.service';
import { UserResolver } from './store/user.resolver';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

const entityMetadata: EntityMetadataMap = {
  User: {
  },
};

export const entityConfig = {
  entityMetadata
};

@NgModule({
  declarations: [
    UserComponent,
    UserListComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveComponentModule
  ],
  exports: [],
  providers: [
    UserEntityService,
    UserResolver,
    UserDataService
  ]
})
export class UserModule {

  constructor(
    private entityDefinitionService: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private userDataService: UserDataService,
  ) {
    entityDefinitionService.registerMetadataMap(entityMetadata);
    entityDataService.registerService('User', userDataService)

  }
}
