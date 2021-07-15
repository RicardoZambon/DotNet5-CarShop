import { ComponentsModule } from './../components/components.module';
import { RefreshButtonComponent } from './refresh-button/refresh-button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportButtonComponent } from './export-button/export-button.component';


@NgModule({
  declarations: [
      ExportButtonComponent,
      RefreshButtonComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
      ExportButtonComponent,
      RefreshButtonComponent,
  ]
})
export class ButtonsModule { }