import { Component, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IAppDatasource } from 'src/app/shared/interfaces/i-app-datasource';

@Component({
    selector: 'app-filter-container',
    templateUrl: './filter-container.component.html',
    styleUrls: ['./filter-container.component.scss']
})
export class FilterContainerComponent implements OnInit {

    @Input() datasource!: IAppDatasource;
    @Input() filterForm!: FormGroup;

    @Output() applyFilter = new EventEmitter();
    @Output() resetFilter = new EventEmitter();


    constructor() { }

    ngOnInit(): void {
    }


    apply() {
        this.applyFilter.emit();
    }

    reset() {
        this.resetFilter.emit();
    }

    @HostListener('keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        if (event.key === 'Escape' && !this.datasource.loading) {
            this.reset();
        }
    }
}