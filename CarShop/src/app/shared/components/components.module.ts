import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { I18nModule } from './../../i18n/i18n.module';
import { PipesModule } from './../pipes/pipes.module';

import { AlertContainerComponent } from './alert-container/alert-container.component';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { ButtonComponent } from './button/button.component';
import { ButtonContainerComponent } from './button-container/button-container.component';
import { ButtonDropdownComponent } from './button-dropdown/button-dropdown.component';
import { ButtonGroupComponent } from './button-group/button-group.component';
import { LoginInputComponent } from './login-input/login-input.component';
import { NavDrawerComponent } from './nav-drawer/nav-drawer.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabItemComponent } from './tab-item/tab-item.component';

import { AutoScrollDirective } from './../directives/auto-scroll/auto-scroll.directive';
import { AutoScrollGridDirective } from './../directives/auto-scroll-grid/auto-scroll-grid.directive';
import { AutofocusDirective } from './../directives/autofocus/autofocus.directive';
import { TrackScrollDirective } from '../directives/track-scroll/track-scroll.directive';

import { GridHeaderComponent } from './grid-header/grid-header.component';

@NgModule({
    declarations: [
        AlertContainerComponent,
        AlertMessageComponent,
        ButtonComponent,
        ButtonContainerComponent,
        ButtonDropdownComponent,
        ButtonGroupComponent,
        LoginInputComponent,
        NavDrawerComponent,
        NavItemComponent,
        SelectLanguageComponent,
        TabsComponent,
        TabItemComponent,

        AutoScrollDirective,
        AutoScrollGridDirective,
        AutofocusDirective,
        TrackScrollDirective,

        GridHeaderComponent,
    ],
    imports: [
        AppRoutingModule,
        CommonModule,
        I18nModule,
        ReactiveFormsModule,
        DragulaModule,
        PipesModule
    ],
    exports: [
        AlertContainerComponent,
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