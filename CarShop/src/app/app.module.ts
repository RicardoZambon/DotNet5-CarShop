import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { I18nModule } from './i18n/i18n.module';
import { LayoutModule } from './layout/layout.module';

import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './shared/components/components.module';

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
        
        ComponentsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
