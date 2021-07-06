import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { I18nModule } from './i18n/i18n.module';
import { LayoutModule } from './layout/layout.module';

import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './shared/components/components.module';
import { DragulaModule } from 'ng2-dragula';

import { CustomReuseStrategy } from './shared/custom-reuse-strategy';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,

        AppRoutingModule,
        I18nModule,
        LayoutModule,

        PagesModule,
        ComponentsModule,
        DragulaModule.forRoot()
    ],
    providers: [
       { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
