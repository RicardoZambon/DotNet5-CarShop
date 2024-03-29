import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from './../components/components.module';
import { I18nModule } from './../../i18n/i18n.module';

import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { ExportButtonComponent } from './export-button/export-button.component';
import { FilterButtonComponent } from './filter-button/filter-button.component';
import { NewButtonComponent } from './new-button/new-button.component';
import { RefreshButtonComponent } from './refresh-button/refresh-button.component';
import { SaveButtonComponent } from './save-button/save-button.component';
import { ViewsButtonComponent } from './views-button/views-button.component';

@NgModule({
    declarations: [
        DeleteButtonComponent,
        EditButtonComponent,
        ExportButtonComponent,
        FilterButtonComponent,
        NewButtonComponent,
        RefreshButtonComponent,
        SaveButtonComponent,
        ViewsButtonComponent,
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        I18nModule
    ],
    exports: [
        DeleteButtonComponent,
        EditButtonComponent,
        ExportButtonComponent,
        FilterButtonComponent,
        NewButtonComponent,
        RefreshButtonComponent,
        SaveButtonComponent,
        ViewsButtonComponent,
    ]
})
export class ButtonsModule { }