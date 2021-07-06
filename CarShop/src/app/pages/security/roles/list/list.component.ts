import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, IDatasource } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { RoleListModel } from 'src/app/shared/models/Security/RoleListModel';

import { RolesService } from './../../../../shared/services/roles.service';


@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class RolesListComponent implements OnInit {

    @ViewChild('grid') grid!: AgGridAngular;

    datasource!: IDatasource;
    
    columnDefs: ColDef[] = [
        { colId: 'id',      field: 'id',    headerName: 'ID',       resizable: false, sortable: true, minWidth: 100, suppressSizeToFit: true, hide: true },
        { colId: 'name',    field: 'name',  headerName: 'Nome',     minWidth: 150, sort: 'asc', flex: 1 },
    ];

    rowData!: Observable<RoleListModel[]>;

    constructor(private rolesService: RolesService) { }

    ngOnInit(): void {
        const rolesService = this.rolesService;
        this.datasource = {
            getRows: async function (params) {
                const roles = await rolesService.getRoles(params.startRow, params.endRow);
                if (typeof roles === 'string') {
                    console.log(roles);
                }
                else {
                    params.successCallback(roles, params.startRow + roles.length < params.endRow ? params.startRow + roles.length : -1);

                    var lastRow = -1;
                    if (roles.length <= params.endRow) {
                        lastRow = roles.length;
                    }
                }
            }
        }
    }

    onGridReady(params: any) {
        params.api.setDatasource(this.datasource);

        this.grid.getRowNodeId = function (data: RoleListModel) {
            return data.id;
        }
    }
}