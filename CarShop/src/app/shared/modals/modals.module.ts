import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { LogoutModalComponent } from './logout-modal/logout-modal.component';

import { PipesModule } from './../pipes/pipes.module';

@NgModule({
    declarations: [
        DeleteModalComponent,
        LogoutModalComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule,
        PipesModule
    ],
    exports: [
        DeleteModalComponent,
        LogoutModalComponent,
    ]
})
export class ModalsModule { }