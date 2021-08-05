import { Component, OnInit, Input } from '@angular/core';

import { IAppDatasource } from 'src/app/shared/interfaces/i-app-datasource';

@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss']
})
export class FilterButtonComponent implements OnInit {

    @Input() datasource!: IAppDatasource;

    get color(): string | undefined { return this.datasource.filtersApplied ? 'text-success' : undefined; }

    
    constructor() { }

    ngOnInit(): void {
    }


    filterToggle() {
        this.datasource.toggleFiltersBox();
    }
}