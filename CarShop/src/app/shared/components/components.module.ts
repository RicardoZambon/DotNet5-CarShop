import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { I18nModule } from './../../i18n/i18n.module';
import { PipesModule } from './../pipes/pipes.module';

import { AlertContainerComponent } from './common/alert-container/alert-container.component';
import { AlertMessageComponent } from './common/alert-message/alert-message.component';
import { ButtonComponent } from './common/button/button.component';
import { ButtonContainerComponent } from './common/button-container/button-container.component';
import { ButtonDropdownComponent } from './common/button-dropdown/button-dropdown.component';
import { ButtonGroupComponent } from './common/button-group/button-group.component';
import { EditContainerComponent } from './edit/edit-container/edit-container.component';
import { EditItemTitleComponent } from './edit/edit-item-title/edit-item-title.component';
import { EditTitleComponent } from './edit/edit-title/edit-title.component';
import { ListContainerComponent } from './list/list-container/list-container.component';
import { LoginInputComponent } from './login/login-input/login-input.component';
import { NavDrawerComponent } from './menu/nav-drawer/nav-drawer.component';
import { NavItemComponent } from './menu/nav-item/nav-item.component';
import { SelectLanguageComponent } from './login/select-language/select-language.component';
import { TabsComponent } from './common/tabs/tabs.component';
import { TabItemComponent } from './common/tab-item/tab-item.component';

import { AutoScrollDirective } from './../directives/auto-scroll/auto-scroll.directive';
import { AutoScrollGridDirective } from './../directives/auto-scroll-grid/auto-scroll-grid.directive';
import { AutofocusDirective } from './../directives/autofocus/autofocus.directive';
import { ScrollSpyDirective } from '../directives/scroll-spy/scroll-spy.directive';
import { TrackScrollDirective } from '../directives/track-scroll/track-scroll.directive';

import { GridHeaderComponent } from './list/grid-header/grid-header.component';
import { GridLoadingRendererComponent } from './list/grid-loading/grid-loading.component';

@NgModule({
    declarations: [
        AlertContainerComponent,
        AlertMessageComponent,
        ButtonComponent,
        ButtonContainerComponent,
        ButtonDropdownComponent,
        ButtonGroupComponent,
        EditContainerComponent,
        EditItemTitleComponent,
        EditTitleComponent,
        ListContainerComponent,
        LoginInputComponent,
        NavDrawerComponent,
        NavItemComponent,
        SelectLanguageComponent,
        TabsComponent,
        TabItemComponent,

        AutoScrollDirective,
        AutoScrollGridDirective,
        AutofocusDirective,
        ScrollSpyDirective,
        TrackScrollDirective,

        GridHeaderComponent,
        GridLoadingRendererComponent,
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
        EditContainerComponent,
        EditItemTitleComponent,
        ListContainerComponent,
        LoginInputComponent,
        NavDrawerComponent,
        NavItemComponent,
        SelectLanguageComponent,
        TabsComponent,

        AutoScrollDirective,
        AutoScrollGridDirective,

        GridHeaderComponent,
        GridLoadingRendererComponent,
    ]
})
export class ComponentsModule { }