import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

import { AlertService } from 'src/app/shared/services/alert.service';
import { GridHeaderComponent } from 'src/app/shared/components/list/grid-header/grid-header.component';
import { GridLoadingRendererComponent } from 'src/app/shared/components/list/grid-loading/grid-loading.component';
import { RoleListModel } from 'src/app/shared/models/Security/role-list-model';
import { RolesListDatasource } from '../roles-list-datasource';
import { RolesService } from 'src/app/shared/services/roles.service';

@Component({
    selector: 'app-roles-list-grid',
    templateUrl: './roles-list-grid.component.html',
    styleUrls: ['./roles-list-grid.component.scss']
})
export class RolesListGridComponent implements OnInit {

    @ViewChild('grid') grid!: AgGridAngular;
    
    datasource!: RolesListDatasource;

    frameworkComponents: any = {
        agColumnHeader: GridHeaderComponent,
        loadingRenderer: GridLoadingRendererComponent
    };
    getRowNodeId = (data: RoleListModel) => data.id;
    cellRendererParams = { loadingMessage: 'Grid-Loading', loadingMessageFailure: 'RolesList-Loading-Failure' };
    columnDefs: ColDef[] = [
        { colId: 'id',      field: 'id',    headerName: 'ID', hide: true },
        { colId: 'name',    field: 'name',  headerName: 'RolesList-Columns-Name', suppressMovable: true, cellRenderer: 'loadingRenderer', cellRendererParams: this.cellRendererParams, minWidth: 150, sort: 'asc', flex: 1, checkboxSelection: true },
    ];
    

    constructor(private rolesService: RolesService, alertService: AlertService) {
        this.datasource = new RolesListDatasource(rolesService, alertService);
    }

    ngOnInit(): void {
        this.rolesService.onRolesUpdated.subscribe(() => {
            this.datasource.refreshData();
        });
    }

    onGridReady(): void {
        this.datasource.setGrid(this.grid);
    }
}