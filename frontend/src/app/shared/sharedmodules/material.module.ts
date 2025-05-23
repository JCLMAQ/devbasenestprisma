import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// avec le découpage en modules, BrowserAnimationsModule ne peut apparaitre qu'une seule fois = dans le app.module
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const MODULES = [
	MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,

  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatStepperModule,
  MatTabsModule,
  MatExpansionModule,

  MatButtonModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,

  MatDialogModule,
  MatTooltipModule,
  MatSnackBarModule,

  MatTableModule,
  MatSortModule,
  MatPaginatorModule,

  MatAutocompleteModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatNativeDateModule,
  DragDropModule,

  // CdkTreeModule,
  // MatAutocompleteModule,
  // MatButtonModule,
  // MatCardModule,
  // MatCheckboxModule,
  // MatChipsModule,
  // MatDividerModule,
  // MatExpansionModule,
  // MatIconModule,
  // MatInputModule,
  // MatListModule,
  // MatMenuModule,
  // MatProgressSpinnerModule,
  // MatPaginatorModule,
  // MatRippleModule,
  // MatSelectModule,
  // MatSidenavModule,
  // MatSnackBarModule,
  // MatSortModule,
  // MatTableModule,
  // MatTabsModule,
  // MatToolbarModule,
  // MatFormFieldModule,
  // MatButtonToggleModule,
  // MatTreeModule,
  // OverlayModule,
  // PortalModule,
  // MatBadgeModule,
  // MatGridListModule,
  // MatRadioModule,
  // MatDatepickerModule,
  // MatTooltipModule

  //    BrowserAnimationsModule
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
  declarations: [],
  providers: [

  ]
})
export class MaterialModule {
}
