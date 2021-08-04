import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-filter-container',
    templateUrl: './filter-container.component.html',
    styleUrls: ['./filter-container.component.scss']
})
export class FilterContainerComponent implements OnInit {

    @Input() title!: string;
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
}