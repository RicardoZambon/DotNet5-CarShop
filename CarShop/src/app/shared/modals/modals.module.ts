import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { LogoutModalComponent } from './logout-modal/logout-modal.component';


@NgModule({
    declarations: [
        DeleteModalComponent,
        LogoutModalComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [
        DeleteModalComponent,
        LogoutModalComponent,
    ]
})
export class ModalsModule { }