import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, IDatasource, SelectionChangedEvent } from 'ag-grid-community';

import { AlertService } from 'src/app/shared/services/alert.service';
import { DeleteModalComponent } from 'src/app/shared/modals/delete-modal/delete-modal.component';
import { ExportButtonComponent } from 'src/app/shared/buttons/export-button/export-button.component';
import { GridHeaderComponent } from 'src/app/shared/components/list/grid-header/grid-header.component';
import { GridLoadingRendererComponent } from 'src/app/shared/components/list/grid-loading/grid-loading.component';
import { ListContainerComponent } from 'src/app/shared/components/list/list-container/list-container.component';
import { MessageModel } from 'src/app/shared/models/message-model';
import { RolesService } from 'src/app/shared/services/roles.service';
import { RoleListModel } from 'src/app/shared/models/Security/role-list-model';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class RolesListComponent implements OnInit {

    @ViewChild('listContainer') listContainer!: ListContainerComponent;
    @ViewChild('grid') grid!: AgGridAngular;
    
    firstLoaded = false;
    datasource!: IDatasource;
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


    /* New */
    newUrl = 'roles/new';

    /* Edit */
    editUrl = 'roles/{id}';

    /* Delete */
    @ViewChild('deleteModal') deleteModal!: DeleteModalComponent;
    deleteClick = async (roleIds: number[]) => this.rolesService.deleteRoles(roleIds);
    deleteConfirmMessageModel = new MessageModel('RolesList-Delete-Title', 'RolesList-Delete-Message');
    deleteAlertMessageModel = new MessageModel('RolesList-Delete-Alert-Title', 'RolesList-Delete-Alert-Message');

    /* Export */
    @ViewChild('exportButton') exportButton!: ExportButtonComponent;
    exportClick = async (option: string) => this.export(option);
    exportAlertMessageModel = new MessageModel('RolesList-Export-Alert-Title', 'RolesList-Export-Alert-Message', false, false);


    constructor(private rolesService: RolesService, private alertService: AlertService) {
    }

    ngOnInit(): void {
        const comp = this;
        this.datasource = {
            getRows: async function (params) {
                await comp.rolesService.getRoles(params.startRow, params.endRow)
                    .then(roles => {
                        comp.firstLoaded = true;
                        params.successCallback(roles, params.startRow + roles.length < params.endRow ? params.startRow + roles.length : -1);
                        
                        var lastRow = -1;
                        if (roles.length <= params.endRow) {
                            lastRow = roles.length;
                        }
    
                        params.successCallback(roles, lastRow);

                    }, ex => {
                        comp.alertService.raiseError(new MessageModel('AlertFailure-Title', 'RolesList-Loading-AlertFailure-Message', false), ex);

                        if (comp.grid) {
                            comp.grid.api.dispatchEvent({ type: 'failCallback' });
                        }
                        
                        return undefined;
                    });
            }
        }

        this.rolesService.onRolesUpdated.subscribe(() => {
            this.grid.api.refreshInfiniteCache();
        });
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


    async export(option: string): Promise<Blob> {
        return await this.rolesService.exportRoles(option);
    }
}