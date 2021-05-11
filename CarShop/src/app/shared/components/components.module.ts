import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { I18nModule } from './../../i18n/i18n.module';

import { SelectLanguageComponent } from './select-language/select-language.component';

@NgModule({
  declarations: [
      SelectLanguageComponent
  ],
  imports: [
    CommonModule,
    I18nModule
  ],
  exports: [
      SelectLanguageComponent
  ]
})
export class ComponentsModule { }
