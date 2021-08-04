import { FilterButtonComponent } from './../../../../shared/buttons/filter-button/filter-button.component';
import { RolesService } from 'src/app/shared/services/roles.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-roles-list-filter',
    template: `
        <app-filter-container
            [title]="'RolesList-Filter-Title' | translate"
            [filterForm]="filterForm"
            (applyFilter)="applyFilter()"
            (resetFilter)="resetFilter()"
        >
            <div class="row g-0">
                <div class="col">
                    <label for="name" class="form-label">{{ 'RolesEdit-Name-Label' | translate }}:</label>
                    <app-edit-input [formGroup]="filterForm" [controlName]="'name'">
                        <div validations>
                            <!-- <div [class.d-none]="!filterForm.controls['name'].errors?.required">{{ 'RolesEdit-Name-Required' | translate}}</div> -->
                        </div>
                    </app-edit-input>
                </div>
            </div>
        </app-filter-container>
    `
})
export class RolesListFilterComponent implements OnInit {

    filterForm!: FormGroup;

    @Input() filterButton!: FilterButtonComponent;

    @Output() filtersSet = new EventEmitter();
    @Output() filtersReset = new EventEmitter();


    constructor(private formBuilder: FormBuilder, private rolesService: RolesService) { }

    ngOnInit(): void {
        this.filterForm = this.formBuilder.group({
            name: ['']
        });
    }


    applyFilter(): void {
        this.rolesService.applyFilter({
            name: this.filterForm.get('name')?.value.toString().trim(),
        });
        this.filterButton.filterApplied = true;
        this.filtersSet.emit();
    }

    resetFilter(): void {
        this.filterForm.setValue({
            name: ''
        });

        this.filterForm.markAsUntouched();
        this.filterForm.markAsPristine();

        this.rolesService.clearFilters();
        this.filterButton.filterApplied = false;

        this.filtersReset.emit();
    }
}