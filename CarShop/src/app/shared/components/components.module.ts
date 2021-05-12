import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { I18nModule } from './../../i18n/i18n.module';
import { ReactiveFormsModule } from '@angular/forms';

import { SelectLanguageComponent } from './select-language/select-language.component';
import { LoginInputComponent } from './login-input/login-input.component';

@NgModule({
  declarations: [
      SelectLanguageComponent,
      LoginInputComponent,
  ],
  imports: [
    CommonModule,
    I18nModule,
    ReactiveFormsModule
  ],
  exports: [
      LoginInputComponent,
      SelectLanguageComponent
  ]
})
export class ComponentsModule { }
