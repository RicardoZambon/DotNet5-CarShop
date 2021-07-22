import { MessageModel } from './../../../../shared/models/message-model';
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

    /* New */
    newUrl = 'roles/new';

    /* Edit */
    editUrl = 'roles/{id}';

    /* Delete */
    deleteClick = async (roleIds: number[]) => this.rolesService.deleteRoles(roleIds);
    deleteConfirmMessageModel = new MessageModel('RolesList-Delete-Title', 'RolesList-Delete-Message');
    deleteAlertMessageModel = new MessageModel('RolesList-Delete-Alert-Title', 'RolesList-Delete-Alert-Message');

    /* Export */
    exportClick = async (option: string) => this.export(option);
    exportAlertMessageModel = new MessageModel('RolesList-Export-Alert-Title', 'RolesList-Export-Alert-Message', false, false);


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

            this.deleteConfirmMessageModel.selectionCount = selectedNodes.length;
            if (this.deleteConfirmMessageModel.selectionCount === 1)  {
                this.deleteConfirmMessageModel.selectionName = (selectedNodes[0].data as RoleListModel).name;
            }

            this.deleteAlertMessageModel.selectionCount = this.deleteConfirmMessageModel.selectionCount;
            this.deleteAlertMessageModel.selectionName = this.deleteConfirmMessageModel.selectionName;
        });
    }


    async export(option: string): Promise<Blob | string> {
        return await this.rolesService.exportRoles(option);
    }
}