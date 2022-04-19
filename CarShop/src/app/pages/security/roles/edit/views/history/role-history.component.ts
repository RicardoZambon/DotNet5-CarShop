import { SelectionChangedEvent } from '@ag-grid-community/core';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AgGridAngular } from '@ag-grid-community/angular';

import { AlertService } from 'src/app/shared/services/alert.service';
import { BaseChildView } from 'src/app/shared/views/base-child-view';
import { RolesHistoryOperationDatasource } from './roles-history-operation-datasource';
import { RolesHistoryServiceDatasource } from './roles-history-service-datasource';
import { RolesService } from 'src/app/shared/services/roles.service';
import { TabService } from 'src/app/shared/services/tab.service';

@Component({
    selector: 'app-view-role-history',
    templateUrl: './role-history.component.html',
    styleUrls: ['./role-history.component.scss']
})
export class RoleViewHistoryComponent extends BaseChildView implements OnInit {

    @ViewChild('serviceGrid') serviceGrid!: AgGridAngular;
    serviceDatasource!: RolesHistoryServiceDatasource;

    @ViewChild('operationGrid') operationGrid!: AgGridAngular;
    operationDatasource!: RolesHistoryOperationDatasource;


    constructor(
        protected rolesService: RolesService,
        alertService: AlertService,
        tabService: TabService,
        route: ActivatedRoute
    ) {
        super(alertService, tabService, route);

        this.serviceDatasource = new RolesHistoryServiceDatasource(rolesService, alertService, route);
        this.operationDatasource = new RolesHistoryOperationDatasource(rolesService, alertService, route);
    }

    ngOnInit(): void {
    }


    async getTitle(): Promise<string> {
        return 'Button-Views-History';
    }

    onViewVisible(): void {
        if (!this.serviceDatasource.isSet && this.serviceGrid) {
            this.serviceDatasource.setGrid(this.serviceGrid);
        }
        
        if (!this.operationDatasource.isSet && this.operationGrid) {
            this.operationDatasource.setGrid(this.serviceGrid, this.operationGrid);
        }
    }

    onServiceGridReady(): void {
        if (this.visible) {
            this.serviceDatasource.setGrid(this.serviceGrid);
        }
    }

    onOperationGridReady(): void {
        if (this.visible) {
            this.operationDatasource.setGrid(this.serviceGrid, this.operationGrid);
        }
    }
}