import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './sharedmodules/material.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavButtonsComponent } from './nav-buttons/nav-buttons.component';



@NgModule({
  declarations: [PageNotFoundComponent, NavButtonsComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    NavButtonsComponent,
  ]
})
export class SharedModule { }
