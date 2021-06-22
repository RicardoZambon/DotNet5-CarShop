import { AutoScrollDirective } from './../directives/auto-scroll/auto-scroll.directive';
import { DragulaModule } from 'ng2-dragula';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from 'src/app/app-routing.module';
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
import { TabItemComponent } from './tab-item/tab-item.component';

@NgModule({
    declarations: [
        LoginInputComponent,
        NavDrawerComponent,
        NavItemComponent,
        SelectLanguageComponent,
        TabsComponent,

        AutoScrollDirective,
        AutofocusDirective,
        TrackScrollDirective,
        TabItemComponent
    ],
    imports: [
        AppRoutingModule,
        CommonModule,
        I18nModule,
        ReactiveFormsModule,
        DragulaModule
    ],
    exports: [
        LoginInputComponent,
        NavDrawerComponent,
        NavItemComponent,
        SelectLanguageComponent,
        TabsComponent,

        AutoScrollDirective
    ]
})
export class ComponentsModule { }
