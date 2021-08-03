import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-list-container',
    templateUrl: './list-container.component.html',
    styleUrls: ['./list-container.component.scss']
})
export class ListContainerComponent implements OnInit {

    @Input() showFilters = false;
    @Input() filtersWidth = 16.25;

    constructor() { }

    ngOnInit(): void {
    }
}