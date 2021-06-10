import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { I18nModule } from './../../i18n/i18n.module';
import { ReactiveFormsModule } from '@angular/forms';

import { SelectLanguageComponent } from './select-language/select-language.component';
import { LoginInputComponent } from './login-input/login-input.component';
import { NavDrawerComponent } from './nav-drawer/nav-drawer.component';
import { NavItemComponent } from './nav-item/nav-item.component';

import { AutofocusDirective } from './../directives/autofocus/autofocus.directive';
import { TrackScrollDirective } from '../directives/track-scroll/track-scroll.directive';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
    declarations: [
        LoginInputComponent,
        NavDrawerComponent,
        NavItemComponent,
        SelectLanguageComponent,
        TabsComponent,

        AutofocusDirective,
        TrackScrollDirective
    ],
    imports: [
        CommonModule,
        I18nModule,
        ReactiveFormsModule
    ],
    exports: [
        LoginInputComponent,
        NavDrawerComponent,
        NavItemComponent,
        SelectLanguageComponent,
        TabsComponent
    ]
})
export class ComponentsModule { }
