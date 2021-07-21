import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

import { MessageFormatPipe } from './message-format.pipe';

@NgModule({
    declarations: [
        MessageFormatPipe,
    ],
    imports: [
        CommonModule,
        //TranslateService
    ],
    exports: [
        MessageFormatPipe
    ]
})
export class PipesModule { }
