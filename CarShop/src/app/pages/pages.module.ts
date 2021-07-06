import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from './../i18n/i18n.module';
import { AgGridModule } from 'ag-grid-angular';
import { ComponentsModule } from './../shared/components/components.module';

import { LoginComponent } from './authentication/login/login.component';
import { MainComponent } from './home/main/main.component';

import { DashboardComponent } from './home/dashboard/dashboard.component';

import { RolesListComponent } from './security/roles/list/list.component';
import { UsersListComponent } from './security/users/list/list.component';
import { UsersEditComponent } from './security/users/edit/edit.component';

@NgModule({
    declarations: [
        LoginComponent,
        MainComponent,
        
        DashboardComponent,

        RolesListComponent,
        UsersListComponent,
        
        UsersEditComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        I18nModule,

        AgGridModule,
        ComponentsModule,
    ]
})
export class PagesModule { }
