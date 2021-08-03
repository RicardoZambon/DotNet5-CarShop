import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CloseModalComponent } from './close-modal/close-modal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { LogoutModalComponent } from './logout-modal/logout-modal.component';

import { PipesModule } from './../pipes/pipes.module';

@NgModule({
    declarations: [
        CloseModalComponent,
        DeleteModalComponent,
        LogoutModalComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule,
        PipesModule
    ],
    exports: [
        CloseModalComponent,
        DeleteModalComponent,
        LogoutModalComponent,
    ]
})
export class ModalsModule { }