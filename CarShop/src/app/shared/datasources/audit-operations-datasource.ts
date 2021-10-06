import { EventEmitter } from '@angular/core';
import { AgGridAngular } from '@ag-grid-community/angular';
import { ColDef, IDatasource, IGetRowsParams, RowNode, SelectionChangedEvent, ViewportChangedEvent } from '@ag-grid-community/core';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';

import { ActivatedRoute } from '@angular/router';
import { AuditOperationCellRendererComponent } from '../components/grid/audit-operation-cell-renderer/audit-operation-cell-renderer.component';
import { GridHeaderComponent } from '../components/list/grid-header/grid-header.component';
import { GridLoadingRendererComponent } from '../components/list/grid-loading/grid-loading.component';
import { OperationAuditHistoryListModel } from '../models/Audit/operation-audit-history-list-model';

export abstract class AuditOperationsDatasource implements IDatasource {
    
    private _serviceId!: number;

    public get serviceId(): number {
        return this._serviceId;
    }

    public get isSet(): boolean {
        return this.grid !== undefined;
    }

    private grid!: AgGridAngular;
    modules = [ InfiniteRowModelModule ];

    loading = false;
    rowCount?: number | undefined;

    loadFailed = new EventEmitter();
    dataLoaded = new EventEmitter();
    selectionChanged = new EventEmitter<SelectionChangedEvent>();

    frameworkComponents: any = {
        agColumnHeader: GridHeaderComponent,
        loadingRenderer: GridLoadingRendererComponent,
        auditOperationCellRenderer: AuditOperationCellRendererComponent
    };
    cellRendererParams = { loadingMessage: 'Grid-Loading', loadingMessageFailure: 'RolesList-Loading-Failure' };
    columnDefs: ColDef[] = [
        { colId: 'name',    field: 'name',  headerName: 'AuditList-Columns-Services', suppressMovable: true, cellRenderer: 'auditOperationCellRenderer', cellRendererParams: this.cellRendererParams, minWidth: 150, flex: 1 },
    ];


    constructor(protected route: ActivatedRoute) {
    }


    setGrid(serviceId: number, grid: AgGridAngular) {
        this.grid = grid;

        this.grid.selectionChanged.subscribe(event => {
            this.selectionChanged.emit(event)
        });

        this.updateEntireDatasource(serviceId);
    }

    abstract getData(params: IGetRowsParams): Promise<OperationAuditHistoryListModel[]>;

    async getRows(params: IGetRowsParams): Promise<void> {
        if (!this.loading) {
            this.loading = true;
        }

        await this.getData(params)
            .then(data => {
                var lastRow = -1;
                if (data.length <= params.endRow) {
                    lastRow = data.length;
                }

                this.dataLoaded.emit();
                params.successCallback(data, lastRow);
                this.grid.api.dispatchEvent({ type: 'successCallback', firstRow: 0, lastRow: lastRow } as ViewportChangedEvent);

            }, ex => {
                this.loadFailed.emit();
                params.failCallback();
                this.grid.api.dispatchEvent({ type: 'failCallback' });
            });

        this.loading = false;
    }


    deselectAll(): void {
        this.grid.api.deselectAll();
    }

    getRowNodeId(data: OperationAuditHistoryListModel): string {
        return data.id.toString();
    };

    getRowNodeDisplayName(data: OperationAuditHistoryListModel): string { 
        return data.entityName;
    }

    getSelectedNodes(): RowNode[] {
        return this.grid.api.getSelectedNodes();
    }


    refreshData(): void {
        if (!this.loading) {
            this.loading = true;
            this.grid.api.refreshInfiniteCache();
        }
    }

    updateEntireDatasource(serviceId: number): void {
        if (!this.loading) {
            this._serviceId = serviceId;

            this.loading = true;

            this.deselectAll();
            this.grid.api.setDatasource(this);
        }
    }
}