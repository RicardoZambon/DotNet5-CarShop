import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from './../i18n/i18n.module';
import { ComponentsModule } from './../shared/components/components.module';

import { LoginComponent } from './authentication/login/login.component';
import { DashboardComponent } from './home/main/dashboard/dashboard.component';

@NgModule({
    declarations: [
        LoginComponent,
        DashboardComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        I18nModule,

        ComponentsModule
    ]
})
export class PagesModule { }
