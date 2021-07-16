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
import { AutoScrollDirective } from './../directives/auto-scroll/auto-scroll.directive';
import { AutoScrollGridDirective } from './../directives/auto-scroll-grid/auto-scroll-grid.directive';
import { TrackScrollDirective } from '../directives/track-scroll/track-scroll.directive';
import { TabsComponent } from './tabs/tabs.component';
import { TabItemComponent } from './tab-item/tab-item.component';
import { ButtonComponent } from './button/button.component';
import { ButtonGroupComponent } from './button-group/button-group.component';
import { ButtonDropdownComponent } from './button-dropdown/button-dropdown.component';
import { ButtonContainerComponent } from './button-container/button-container.component';
import { GridHeaderComponent } from './grid-header/grid-header.component';

@NgModule({
    declarations: [
        ButtonComponent,
        ButtonContainerComponent,
        ButtonDropdownComponent,
        ButtonGroupComponent,
        LoginInputComponent,
        NavDrawerComponent,
        NavItemComponent,
        SelectLanguageComponent,
        TabsComponent,

        AutoScrollDirective,
        AutoScrollGridDirective,
        AutofocusDirective,
        TrackScrollDirective,
        TabItemComponent,

        GridHeaderComponent,
        
    ],
    imports: [
        AppRoutingModule,
        CommonModule,
        I18nModule,
        ReactiveFormsModule,
        DragulaModule
    ],
    exports: [
        ButtonComponent,
        ButtonContainerComponent,
        ButtonDropdownComponent,
        ButtonGroupComponent,
        LoginInputComponent,
        NavDrawerComponent,
        NavItemComponent,
        SelectLanguageComponent,
        TabsComponent,

        AutoScrollDirective,
        AutoScrollGridDirective,

        GridHeaderComponent,
    ]
})
export class ComponentsModule { }
