import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { GridHeaderComponent } from '../shared/components/list/grid-header/grid-header.component';
import { GridLoadingRendererComponent } from '../shared/components/list/grid-loading/grid-loading.component';
import { I18nModule } from './../i18n/i18n.module';
import { ButtonsModule } from './../shared/buttons/buttons.module';
import { ComponentsModule } from './../shared/components/components.module';
import { ModalsModule } from './../shared/modals/modals.module';

import { LoginComponent } from './authentication/login/login.component';
import { MainComponent } from './home/main/main.component';

import { DashboardComponent } from './home/dashboard/dashboard.component';

import { RolesEditComponent } from './security/roles/edit/edit.component';
import { RolesListComponent } from './security/roles/list/roles-list.component';
import { RolesListFilterComponent } from './security/roles/list/filters/roles-list-filter.component';
import { UsersEditComponent } from './security/users/edit/edit.component';
import { UsersListComponent } from './security/users/list/list.component';
import { RolesListGridComponent } from './security/roles/list/grid/roles-list-grid.component';
import { RolesListButtonsComponent } from './security/roles/list/buttons/roles-list-buttons.component';

@NgModule({
    declarations: [
        LoginComponent,
        MainComponent,
        
        DashboardComponent,

        RolesEditComponent,
        RolesListComponent,
        RolesListButtonsComponent,
        RolesListGridComponent,
        RolesListFilterComponent,

        UsersEditComponent,
        UsersListComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        
        AgGridModule.withComponents([
            GridHeaderComponent,
            GridLoadingRendererComponent
        ]),

        I18nModule,
        ButtonsModule,
        ComponentsModule,
        ModalsModule,
    ]
})
export class PagesModule { }
