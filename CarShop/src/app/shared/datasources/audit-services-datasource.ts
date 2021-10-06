import { EventEmitter } from '@angular/core';
import { AgGridAngular } from '@ag-grid-community/angular';
import { ColDef, IDatasource, IGetRowsParams, RowNode, SelectionChangedEvent, ViewportChangedEvent } from '@ag-grid-community/core';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';

import { ActivatedRoute } from '@angular/router';
import { GridHeaderComponent } from '../components/list/grid-header/grid-header.component';
import { GridLoadingRendererComponent } from '../components/list/grid-loading/grid-loading.component';
import { ServiceAuditHistoryListModel } from '../models/Audit/service-audit-history-list-model';
import { AuditServiceCellRendererComponent } from '../components/grid/audit-service-cell-renderer/audit-service-cell-renderer.component';

export abstract class AuditServicesDatasource implements IDatasource {
    
    public get entityId(): number {
        return parseInt(this.route.snapshot.paramMap.get('id')?.toString() ?? '0');
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
        auditServiceCellRenderer: AuditServiceCellRendererComponent
    };
    cellRendererParams = { loadingMessage: 'Grid-Loading', loadingMessageFailure: 'RolesList-Loading-Failure' };
    columnDefs: ColDef[] = [
        { colId: 'name',    field: 'name',  headerName: 'AuditList-Columns-Services', suppressMovable: true, cellRenderer: 'auditServiceCellRenderer', cellRendererParams: this.cellRendererParams, minWidth: 150, flex: 1 },
    ];


    constructor(protected route: ActivatedRoute) {
    }


    setGrid(grid: AgGridAngular) {
        this.grid = grid;

        this.grid.selectionChanged.subscribe(event => {
            this.selectionChanged.emit(event)
        });

        this.updateEntireDatasource();
    }

    abstract getData(params: IGetRowsParams): Promise<ServiceAuditHistoryListModel[]>;

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

    getRowNodeId(data: ServiceAuditHistoryListModel): string {
        return data.id.toString();
    };

    getRowNodeDisplayName(data: ServiceAuditHistoryListModel): string { 
        return data.name;
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