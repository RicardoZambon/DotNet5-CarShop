import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { GridHeaderComponent } from './../shared/components/grid-header/grid-header.component';
import { GridLoadingRendererComponent } from './../shared/components/grid-loading/grid-loading.component';
import { I18nModule } from './../i18n/i18n.module';
import { ButtonsModule } from './../shared/buttons/buttons.module';
import { ComponentsModule } from './../shared/components/components.module';
import { ModalsModule } from './../shared/modals/modals.module';

import { LoginComponent } from './authentication/login/login.component';
import { MainComponent } from './home/main/main.component';

import { DashboardComponent } from './home/dashboard/dashboard.component';

import { RolesListComponent } from './security/roles/list/list.component';
import { UsersListComponent } from './security/users/list/list.component';
import { UsersEditComponent } from './security/users/edit/edit.component';
import { RolesEditComponent } from './security/roles/edit/edit.component';

@NgModule({
    declarations: [
        LoginComponent,
        MainComponent,
        
        DashboardComponent,

        RolesListComponent,
        UsersListComponent,
        
        RolesEditComponent,
        UsersEditComponent,
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
