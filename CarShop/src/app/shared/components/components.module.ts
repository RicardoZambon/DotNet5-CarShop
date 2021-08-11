import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { I18nModule } from './../../i18n/i18n.module';
import { ModalsModule } from './../modals/modals.module';
import { PipesModule } from './../pipes/pipes.module';

import { AlertContainerComponent } from './common/alert-container/alert-container.component';
import { AlertMessageComponent } from './common/alert-message/alert-message.component';
import { ButtonComponent } from './common/button/button.component';
import { ButtonContainerComponent } from './common/button-container/button-container.component';
import { ButtonDropdownComponent } from './common/button-dropdown/button-dropdown.component';
import { ButtonGroupComponent } from './common/button-group/button-group.component';
import { EditContainerComponent } from './edit/edit-container/edit-container.component';
import { EditGroupComponent } from './edit/edit-group/edit-group.component';
import { EditInputComponent } from './edit/edit-input/edit-input.component';
import { EditSectionComponent } from './edit/edit-section/edit-section.component';
import { EditTitleComponent } from './edit/edit-title/edit-title.component';
import { FilterContainerComponent } from './list/filter-container/filter-container.component';
import { GridStatusContainerComponent } from './list/grid-status-container/grid-status-container.component';
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
import { CloseConfirmDirective } from '../directives/close-confirm/close-confirm.directive';
import { FormFocusInvalidInputDirective } from './../directives/form-focus-invalid-input/form-focus-invalid-input.directive';
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
        EditGroupComponent,
        EditInputComponent,
        EditSectionComponent,
        EditTitleComponent,
        FilterContainerComponent,
        GridStatusContainerComponent,
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
        CloseConfirmDirective,
        FormFocusInvalidInputDirective,
        ScrollSpyDirective,
        TrackScrollDirective,

        GridHeaderComponent,
        GridLoadingRendererComponent,
        
    ],
    imports: [
        AppRoutingModule,
        CommonModule,
        I18nModule,
        ModalsModule,
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
        EditGroupComponent,
        EditInputComponent,
        EditSectionComponent,
        FilterContainerComponent,
        GridStatusContainerComponent,
        ListContainerComponent,
        LoginInputComponent,
        NavDrawerComponent,
        NavItemComponent,
        SelectLanguageComponent,
        TabsComponent,

        AutoScrollDirective,
        AutoScrollGridDirective,
        CloseConfirmDirective,
        FormFocusInvalidInputDirective,

        GridHeaderComponent,
        GridLoadingRendererComponent,
    ]
})
export class ComponentsModule { }