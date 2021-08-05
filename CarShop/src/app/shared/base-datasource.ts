import { EventEmitter } from '@angular/core';
import { IDatasource, IGetRowsParams, RowNode, SelectionChangedEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

import { IAppDatasource } from 'src/app/shared/interfaces/i-app-datasource';


export abstract class BaseDatasource implements IDatasource, IAppDatasource {
    
    private grid!: AgGridAngular;

    loading = false;
    rowCount?: number | undefined;
    showFilters = false;

    loadFailed = new EventEmitter();
    dataLoaded = new EventEmitter();
    filtersShown = new EventEmitter();
    selectionChanged = new EventEmitter<SelectionChangedEvent>();

    abstract get filtersApplied(): boolean;


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

    abstract getRows(params: IGetRowsParams): void;


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


    abstract serviceApplyFilters(filters: any): void;
    applyFilters(filters: any): void {
        this.serviceApplyFilters(filters);
        this.updateEntireDatasource();
    }

    abstract serviceClearFilters(): void;
    clearFilters(): void {
        if (this.filtersApplied) {
            this.serviceClearFilters();
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
}