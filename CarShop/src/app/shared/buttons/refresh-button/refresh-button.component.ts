import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

import { ButtonComponent } from '../../components/common/button/button.component';

@Component({
    selector: 'app-refresh-button',
    templateUrl: './refresh-button.component.html',
    styleUrls: ['./refresh-button.component.scss']
})
export class RefreshButtonComponent implements OnInit, AfterViewInit {

    @Input() grid!: AgGridAngular;
    @ViewChild('refreshButton') refreshButton!: ButtonComponent;

    constructor() { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.grid.paginationChanged.subscribe(() => {
            if (this.refreshButton?.isLoading) {
                this.refreshButton.completeLoading();
            }
        });

        this.grid.gridReady.subscribe(() => {
            this.grid.api.addEventListener('failCallback', () => {
                if (this.refreshButton?.isLoading) {
                    this.refreshButton.cancelLoadingWithError();
                }
            });
        });
    }


    refresh() {
        this.grid.api.refreshInfiniteCache();
    }
}