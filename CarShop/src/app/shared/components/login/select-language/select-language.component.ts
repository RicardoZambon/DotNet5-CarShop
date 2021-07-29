import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-select-language',
    templateUrl: './select-language.component.html',
    styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent implements OnInit {

    constructor(public translate: TranslateService) { }

    ngOnInit(): void {
    }
}