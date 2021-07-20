import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';

import { AppRoutingModule } from '../app-routing.module';
import { ComponentsModule } from '../shared/components/components.module';
import { ModalsModule } from './../shared/modals/modals.module';

@NgModule({
    declarations: [
        HomeLayoutComponent,
        LoginLayoutComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        AppRoutingModule,
        ComponentsModule,
        ModalsModule
    ]
})
export class LayoutModule { }