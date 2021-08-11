import { Component, OnInit, Input } from '@angular/core';

import { IListDatasource } from 'src/app/shared/interfaces/i-list-datasource';

@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss']
})
export class FilterButtonComponent implements OnInit {

    @Input() datasource!: IListDatasource;

    get color(): string | undefined { return this.datasource.filtersApplied ? 'text-success' : undefined; }

    
    constructor() { }

    ngOnInit(): void {
    }


    filterToggle() {
        this.datasource.toggleFiltersBox();
    }
}