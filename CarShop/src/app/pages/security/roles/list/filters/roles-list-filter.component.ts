import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { RolesService } from 'src/app/shared/services/roles.service';
import { IListDatasource } from 'src/app/shared/interfaces/i-list-datasource';

@Component({
    selector: 'app-roles-list-filter',
    templateUrl: './roles-list-filter.component.html'
})
export class RolesListFilterComponent implements OnInit {

    filterForm!: FormGroup;

    @Input() datasource!: IListDatasource;

    @Output() filtersSet = new EventEmitter();
    @Output() filtersReset = new EventEmitter();


    constructor(private formBuilder: FormBuilder, private rolesService: RolesService) { }

    ngOnInit(): void {
        this.filterForm = this.formBuilder.group({
            name: ['']
        });
    }


    applyFilter(): void {
        this.datasource.applyFilters({
            name: this.filterForm.get('name')?.value.toString().trim(),
        });
    }

    resetFilter(): void {
        this.filterForm.setValue({
            name: ''
        });

        this.filterForm.markAsUntouched();
        this.filterForm.markAsPristine();

        this.datasource.clearFilters();
    }
}