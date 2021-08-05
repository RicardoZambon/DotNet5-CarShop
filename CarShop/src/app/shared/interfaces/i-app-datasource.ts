import { EventEmitter } from '@angular/core';
import { RowNode, SelectionChangedEvent } from 'ag-grid-community';
import { QueryParametersModel } from '../models/query-parameters-model';

export interface IAppDatasource {
    
    loading: boolean;
    showFilters: boolean;

    dataLoaded: EventEmitter<any>;
    filtersShown: EventEmitter<any>;
    loadFailed: EventEmitter<any>;
    selectionChanged: EventEmitter<SelectionChangedEvent>;

    queryParameters: QueryParametersModel;
    filtersApplied: boolean;

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