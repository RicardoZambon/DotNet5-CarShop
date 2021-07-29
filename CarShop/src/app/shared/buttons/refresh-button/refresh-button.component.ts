import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

import { ButtonComponent } from '../../components/common/button/button.component';

@Component({
    selector: 'app-refresh-button',
    templateUrl: './refresh-button.component.html',
    styleUrls: ['./refresh-button.component.scss']
})
export class RefreshButtonComponent implements OnInit {

    @Input() grid!: AgGridAngular;
    @ViewChild('refreshButton') refreshButton!: ButtonComponent;

    constructor() { }

    ngOnInit(): void {
        this.grid.paginationChanged.subscribe(() => {
            if (this.refreshButton?.isLoading) {
                this.refreshButton.completeLoading();
            }
        });
    }

    refresh() {
        this.grid.api.refreshInfiniteCache();
    }
}
