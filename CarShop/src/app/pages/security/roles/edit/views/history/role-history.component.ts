import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AgGridAngular } from '@ag-grid-community/angular';

import { AlertService } from 'src/app/shared/services/alert.service';
import { BaseChildView } from 'src/app/shared/views/base-child-view';
import { RolesHistoryDatasource } from './roles-history-datasource';
import { RolesService } from 'src/app/shared/services/roles.service';
import { TabService } from 'src/app/shared/services/tab.service';

@Component({
    selector: 'app-view-role-history',
    templateUrl: './role-history.component.html',
    styleUrls: ['./role-history.component.scss']
})
export class RoleViewHistoryComponent extends BaseChildView implements OnInit {

    @ViewChild('grid') grid!: AgGridAngular;

    datasource!: RolesHistoryDatasource;


    constructor(
        protected rolesService: RolesService,
        alertService: AlertService,
        tabService: TabService,
        route: ActivatedRoute
    ) {
        super(alertService, tabService, route);

        this.datasource = new RolesHistoryDatasource(rolesService, alertService, route);
    }

    ngOnInit(): void {
    }


    async getTitle(): Promise<string> {
        return 'Button-Views-History';
    }

    onViewVisible(): void {
        if (this.datasource.isSet) {   
            this.datasource.updateEntireDatasource();
        }
        else if (this.grid) {
            this.datasource.setGrid(this.grid);
        }
    }

    onGridReady(): void {
        if (this.visible) {
            this.datasource.setGrid(this.grid);
        }
    }
}