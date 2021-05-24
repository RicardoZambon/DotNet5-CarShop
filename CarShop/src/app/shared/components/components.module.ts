import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { I18nModule } from './../../i18n/i18n.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AutofocusDirective } from './../directives/autofocus/autofocus.directive';

import { SelectLanguageComponent } from './select-language/select-language.component';
import { LoginInputComponent } from './login-input/login-input.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
    declarations: [
        LoginInputComponent,
        MenuComponent,
        SelectLanguageComponent,

        AutofocusDirective,
    ],
    imports: [
        CommonModule,
        I18nModule,
        ReactiveFormsModule
    ],
    exports: [
        LoginInputComponent,
        MenuComponent,
        SelectLanguageComponent,
    ]
})
export class ComponentsModule { }
