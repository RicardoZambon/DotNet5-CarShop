import { DeleteButtonComponent } from './../../../../shared/buttons/delete-button/delete-button.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, IDatasource, SelectionChangedEvent } from 'ag-grid-community';

import { RolesService } from './../../../../shared/services/roles.service';
import { RoleListModel } from 'src/app/shared/models/Security/RoleListModel';

import { GridHeaderComponent } from './../../../../shared/components/grid-header/grid-header.component';
import { ExportButtonComponent } from './../../../../shared/buttons/export-button/export-button.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class RolesListComponent implements OnInit {

    @ViewChild('grid') grid!: AgGridAngular;
    @ViewChild('exportButton') exportButton!: ExportButtonComponent;

    datasource!: IDatasource;
    frameworkComponents: any = { agColumnHeader: GridHeaderComponent };
    getRowNodeId = (data: RoleListModel) => data.id;
    columnDefs: ColDef[] = [
        { colId: 'id',      field: 'id',    headerName: 'ID', hide: true },
        { colId: 'name',    field: 'name',  headerName: 'RolesList-Columns-Name', suppressMovable: true, minWidth: 150, sort: 'asc', flex: 1, checkboxSelection: true },
    ];

    selectionCount = 0;
    selectionName = '';

    deleteClick = async (roleIds: number[]) => this.rolesService.deleteRoles(roleIds);
    exportClick = async (option: string) => this.export(option);


    constructor(private rolesService: RolesService) {
    }

    ngOnInit(): void {
        const comp = this;
        this.datasource = {
            getRows: async function (params) {
                const roles = await comp.rolesService.getRoles(params.startRow, params.endRow);
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
    
    onGridReady(params: any): void {
        params.api.setDatasource(this.datasource);

        this.grid.selectionChanged.subscribe((event: SelectionChangedEvent) => {
            const selectedNodes = event.api.getSelectedNodes();
            this.selectionCount = selectedNodes.length;
            if (this.selectionCount === 1)  {
                this.selectionName = (event.api.getSelectedNodes()[0].data as RoleListModel).name;
            }
        });
    }


    async delete() {
        const del = new DeleteButtonComponent();
        del.click
    }

    async export(option: string): Promise<Blob | null> {
        const roles = await this.rolesService.exportRoles(option);
        if (typeof roles === 'string') {
            console.log(roles);
            return null;
        }
        else {
            return roles;
        }
    }
}