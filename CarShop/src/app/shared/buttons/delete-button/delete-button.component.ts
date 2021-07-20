import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { SelectionChangedEvent } from 'ag-grid-community';

import { ButtonComponent } from '../../components/button/button.component';

@Component({
    selector: 'app-delete-button',
    templateUrl: './delete-button.component.html',
    styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements OnInit {

    @Input() modalId!: string;
    @Input() grid!: AgGridAngular;

    @Input() delete?: (selectedIds: number[]) => Promise<string | boolean>;

    @ViewChild('deleteButton') deleteButton!: ButtonComponent;

    disabled = true;


    constructor() { }

    ngOnInit(): void {
        this.grid.selectionChanged.subscribe((event: SelectionChangedEvent) => {
            this.disabled = event.api.getSelectedNodes().length <= 0;
        });
    }

    async click(): Promise<void> {
        
        this.deleteButton.startLoading();

        if (this.delete) {
            const result = await this.delete(
                this.grid.api.getSelectedNodes().map(x => Number(x.id))
            );

            if (typeof result === 'string') {
                console.log(result);
                this.deleteButton.cancelLoading();
            }
            else {
                this.grid.api.deselectAll();
                this.grid.api.refreshInfiniteCache();
                this.deleteButton.completeLoading(true);
            }
        }
    }
}