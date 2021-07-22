import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from './../components/components.module';
import { I18nModule } from './../../i18n/i18n.module';

import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { ExportButtonComponent } from './export-button/export-button.component';
import { NewButtonComponent } from './new-button/new-button.component';
import { RefreshButtonComponent } from './refresh-button/refresh-button.component';

@NgModule({
  declarations: [
      DeleteButtonComponent,
      EditButtonComponent,
      ExportButtonComponent,
      NewButtonComponent,
      RefreshButtonComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    I18nModule
  ],
  exports: [
      DeleteButtonComponent,
      EditButtonComponent,
      ExportButtonComponent,
      NewButtonComponent,
      RefreshButtonComponent,
  ]
})
export class ButtonsModule { }