import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { UserEntityService } from './store/user-entity.service';
import { UserResolver } from './store/user.resolver';
import { UserDataService } from './store/user-data.service';

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
    UserDetailComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
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
