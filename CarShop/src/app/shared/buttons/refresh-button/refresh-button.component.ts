import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { ButtonComponent } from '../../components/common/button/button.component';
import { IListDatasource } from 'src/app/shared/interfaces/i-list-datasource';

@Component({
    selector: 'app-refresh-button',
    templateUrl: './refresh-button.component.html',
    styleUrls: ['./refresh-button.component.scss']
})
export class RefreshButtonComponent implements OnInit, AfterViewInit {

    @Input() datasource!: IListDatasource;
    @ViewChild('refreshButton') refreshButton!: ButtonComponent;

    constructor() { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.datasource.dataLoaded.subscribe(() => {
            if (this.refreshButton?.isLoading) {
                this.refreshButton.completeLoading();
            }
        });

        this.datasource.loadFailed.subscribe(() => {
            if (this.refreshButton?.isLoading) {
                this.refreshButton.cancelLoadingWithError();
            }
        });
    }


    refresh() {
        this.datasource.refreshData();
    }
}