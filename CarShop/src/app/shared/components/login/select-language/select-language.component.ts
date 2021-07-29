import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Dropdown } from 'bootstrap';

@Component({
    selector: 'app-select-language',
    templateUrl: './select-language.component.html',
    styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent implements OnInit, AfterViewInit {

    @ViewChild('dropdown') dropdownElement!: ElementRef<HTMLButtonElement>;
    dropdown!: Dropdown;

    constructor(public translate: TranslateService) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.dropdown = new Dropdown(this.dropdownElement.nativeElement);
    }

    click(): void {
        this.dropdown.toggle();
    }
}