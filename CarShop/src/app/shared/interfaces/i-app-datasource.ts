import { EventEmitter } from '@angular/core';
import { RowNode, SelectionChangedEvent } from 'ag-grid-community';

export interface IAppDatasource {
    
    showFilters: boolean;
    loading: boolean;
    filtersApplied: boolean;

    dataLoaded: EventEmitter<any>;
    filtersShown: EventEmitter<any>;
    loadFailed: EventEmitter<any>;
    selectionChanged: EventEmitter<SelectionChangedEvent>;

    deselectAll(): void;
    getRowNodeId(data: any): any;
    getRowNodeDisplayName(data: any): string;
    getSelectedNodes(): RowNode[];
    refreshData(): void;
    updateEntireDatasource(): void;

    applyFilters(filters: any): void;
    clearFilters(): void;
    toggleFiltersBox(): void
}