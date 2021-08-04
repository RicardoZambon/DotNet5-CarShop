import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-list-container',
    templateUrl: './list-container.component.html',
    styleUrls: ['./list-container.component.scss']
})
export class ListContainerComponent implements OnInit {

    @ViewChild('filters') filtersElement!: ElementRef<HTMLElement>;

    @Input() showFilters = false;
    @Input() filtersWidth = 16.25;

    constructor() { }

    ngOnInit(): void {
    }


    toggleFilters(): void {
        this.showFilters = !this.showFilters;

        if (this.showFilters) {
            (this.filtersElement.nativeElement.querySelector('.form-control') as HTMLElement)?.focus();
        }
    }
}