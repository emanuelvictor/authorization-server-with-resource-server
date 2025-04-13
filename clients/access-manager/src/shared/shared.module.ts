// ANGULAR
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextMaskModule} from 'angular2-text-mask';
import {CurrencyMaskModule} from 'ng2-currency-mask';
// https://github.com/lentschi/ngx-ellipsis
import {EllipsisModule} from 'ngx-ellipsis';
// ANGULAR MATERIAL
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
// COVALENT
import {
  CovalentChipsModule,
  CovalentCommonModule,
  CovalentDialogsModule,
  CovalentExpansionPanelModule,
  CovalentFileModule,
  CovalentLoadingModule,
  CovalentMediaModule
} from '@covalent/core';
import {CovalentMarkdownModule} from '@covalent/markdown';
import {RecoveryPasswordComponent} from "../system/application/presentation/manage-password/recovery-password.component";
import {InsertPasswordComponent} from "../system/application/presentation/manage-password/insert-password.component";
import {DeleteDialogComponent} from "../system/application/controls/delete-dialog/delete-dialog.component";
import {CapitalizePipe} from "../system/application/controls/pipes/capitalize.pipe";
import {HorizontalSpaceComponent} from "../system/application/controls/horizontal-space.component";
import {VerticalSpaceComponent} from "../system/application/controls/vertical-space.component";
import {FocusOnInitDirective} from "../system/application/utils/focus-on-init.directive";
import {DragDropModule} from '@angular/cdk/drag-drop';

/**
 *
 */
@NgModule({
  declarations: [
    // Recuperar senha
    RecoveryPasswordComponent,
    InsertPasswordComponent,
    DeleteDialogComponent,

    // Controls
    HorizontalSpaceComponent,
    VerticalSpaceComponent,

    // Pipe
    CapitalizePipe,

    // DIRECTIVES
    FocusOnInitDirective,
  ],
  imports: [
    // ANGULAR
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    RouterModule,
    TextMaskModule,
    CurrencyMaskModule,

    // ANGULAR MATERIAL
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatOptionModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatTabsModule,
    MatExpansionModule,

    // COVALENT
    CovalentChipsModule,
    CovalentCommonModule,
    CovalentFileModule,
    CovalentLoadingModule,
    CovalentMediaModule,
    CovalentDialogsModule,
    CovalentMarkdownModule,
    CovalentExpansionPanelModule,

    // Ellipsis
    EllipsisModule
  ],
  exports: [
    // ANGULAR
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TextMaskModule,
    CurrencyMaskModule,
    DragDropModule,

    // ANGULAR MATERIAL
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatOptionModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatTabsModule,
    MatExpansionModule,

    // COVALENT
    CovalentChipsModule,
    CovalentCommonModule,
    CovalentFileModule,
    CovalentLoadingModule,
    CovalentMediaModule,
    CovalentDialogsModule,
    CovalentMarkdownModule,
    CovalentExpansionPanelModule,

    // Ellipsis
    EllipsisModule,

    HorizontalSpaceComponent,
    VerticalSpaceComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}
  ]
})
export class SharedModule {
  constructor(public dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('pt-BR');
  }
}
