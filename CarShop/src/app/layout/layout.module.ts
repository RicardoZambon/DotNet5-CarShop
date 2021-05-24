import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';

import { AppRoutingModule } from '../app-routing.module';
import { ComponentsModule } from '../shared/components/components.module';

@NgModule({
    declarations: [
        HomeLayoutComponent,
        LoginLayoutComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        ComponentsModule,
        //DirectivesModule
    ]
})
export class LayoutModule { }