import { Component, OnInit, Input } from '@angular/core';

import { ListContainerComponent } from './../../components/list/list-container/list-container.component';

@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss']
})
export class FilterButtonComponent implements OnInit {

    @Input() listContainer!: ListContainerComponent;
    @Input() filterApplied = false;

    get color(): string | undefined {
        return this.filterApplied
                ? 'text-success'
                : undefined;
    }

    
    constructor() { }

    ngOnInit(): void {
    }


    filterToggle() {
        console.log(this.listContainer.showFilters);
        this.listContainer.showFilters = !this.listContainer.showFilters;
    }
}