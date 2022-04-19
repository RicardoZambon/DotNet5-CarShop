import { EventEmitter } from '@angular/core';
import { AgGridAngular } from '@ag-grid-community/angular';
import { ColDef, IDatasource, IGetRowsParams, RowNode, SelectionChangedEvent, ViewportChangedEvent } from '@ag-grid-community/core';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';

import { ActivatedRoute } from '@angular/router';
import { AuditOperationCellRendererComponent } from '../components/grid/audit-operation-cell-renderer/audit-operation-cell-renderer.component';
import { GridHeaderComponent } from '../components/list/grid-header/grid-header.component';
import { GridLoadingRendererComponent } from '../components/list/grid-loading/grid-loading.component';
import { OperationAuditHistoryListModel } from '../models/Audit/operation-audit-history-list-model';
import { ServiceAuditHistoryListModel } from '../models/Audit/service-audit-history-list-model';

export abstract class AuditOperationsDatasource implements IDatasource {
    
    private _serviceId: number | undefined;
    public get serviceId(): number {
        return this._serviceId ?? 0;
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
        { colId: 'name',    field: 'name',  headerName: 'AuditList-Columns-Operations', suppressMovable: true, cellRenderer: 'auditOperationCellRenderer', cellRendererParams: this.cellRendererParams, minWidth: 150, flex: 1 },
    ];


    constructor(protected route: ActivatedRoute) {
    }


    setGrid(servicesGrid: AgGridAngular, operationsGrid: AgGridAngular) {
        servicesGrid.selectionChanged.subscribe((x: SelectionChangedEvent) => {
            const selected = x.api.getSelectedRows() as ServiceAuditHistoryListModel[];

            if (selected.length > 0) {
                this._serviceId = selected[0].id;
            }
            else {
                this._serviceId = undefined;
            }
            
            this.updateEntireDatasource();
        });
        
        this.grid = operationsGrid;

        this.grid.selectionChanged.subscribe(event => {
            this.selectionChanged.emit(event)
        });

        this.updateEntireDatasource();
    }

    abstract getData(params: IGetRowsParams): Promise<OperationAuditHistoryListModel[]>;

    async getRows(params: IGetRowsParams): Promise<void> {
        if (this._serviceId === undefined) {
            if (this.loading) {
                this.loading = false;
            }
            return;
        }
        
        if (!this.loading) {
            this.loading = true;
        }

        await this.getData(params)
            .then(data => {
                var lastRow = -1;
                if (data.length <= params.endRow) {
                    lastRow = data.length;
                }

                console.log(data);

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

    updateEntireDatasource(): void {
        if (!this.loading) {
            this.loading = true;

            this.deselectAll();
            this.grid.api.setDatasource(this);
        }
    }
}