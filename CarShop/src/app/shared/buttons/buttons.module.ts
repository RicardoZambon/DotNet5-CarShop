import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from './../components/components.module';
import { I18nModule } from './../../i18n/i18n.module';

import { RefreshButtonComponent } from './refresh-button/refresh-button.component';
import { ExportButtonComponent } from './export-button/export-button.component';

@NgModule({
  declarations: [
      ExportButtonComponent,
      RefreshButtonComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    I18nModule
  ],
  exports: [
      ExportButtonComponent,
      RefreshButtonComponent,
  ]
})
export class ButtonsModule { }