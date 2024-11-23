import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LetDirective } from '@ngrx/component';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';

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

@NgModule({ exports: [], imports: [CommonModule,
        UserRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        LetDirective,
        UserComponent,
        UserListComponent,
        UserProfileComponent], providers: [
        UserEntityService,
        UserResolver,
        UserDataService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
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
