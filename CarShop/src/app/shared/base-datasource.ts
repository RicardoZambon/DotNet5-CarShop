import { EventEmitter } from '@angular/core';
import { IDatasource, IGetRowsParams, RowNode, SelectionChangedEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

import { IAppDatasource } from 'src/app/shared/interfaces/i-app-datasource';
import { QueryParametersModel } from './models/query-parameters-model';

export abstract class BaseDatasource implements IDatasource, IAppDatasource {
    
    private grid!: AgGridAngular;

    loading = false;
    rowCount?: number | undefined;
    showFilters = false;

    loadFailed = new EventEmitter();
    dataLoaded = new EventEmitter();
    filtersShown = new EventEmitter();
    selectionChanged = new EventEmitter<SelectionChangedEvent>();

    private _queryParameters = new QueryParametersModel();
    get queryParameters(): QueryParametersModel { return this._queryParameters; }

    private _filtersApplied = false;
    get filtersApplied(): boolean { return this._filtersApplied; }


    constructor() {
    }


    setGrid(grid: AgGridAngular) {
        this.grid = grid;

        this.grid.selectionChanged.subscribe(event => {
            this.selectionChanged.emit(event)
        });

        this.updateEntireDatasource();
    }

    abstract getRowNodeId(data: any): any;

    abstract getRowNodeDisplayName(data: any): string;

    abstract getData(params: IGetRowsParams): Promise<any>;

    async getRows(params: IGetRowsParams): Promise<void> {
        if (!this.loading) {
            this.loading = true;
        }
        
        this.setSort(params.sortModel);

        await this.getData(params)
            .then(data => {
                var lastRow = -1;
                if (data.length <= params.endRow) {
                    lastRow = data.length;
                }

                this.dataLoaded.emit();
                params.successCallback(data, lastRow);
                this.grid.api.dispatchEvent({ type: 'successCallback' });

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


    applyFilters(filters: { [id: string]: any }): void {
        this._filtersApplied = true;
        this._queryParameters.Filters = filters;

        this.updateEntireDatasource();
    }

    clearFilters(): void {
        if (this.filtersApplied) {
            this._filtersApplied = false;
            this._queryParameters.Filters = {};

            this.updateEntireDatasource();
        }
        
        if (this.showFilters) {
            this.toggleFiltersBox();
        }
    }

    toggleFiltersBox(): void {
        this.showFilters = !this.showFilters;
        
        if (this.showFilters) {
            this.filtersShown.emit();
        }
    }


    setSort(sortArray: [ { sort: 'asc' | 'desc', colId: string } ]): void {
        this.queryParameters.Sort = {};
        sortArray.forEach(x => {
            this.queryParameters.Sort[x.colId] = x.sort;
        });
    }
}