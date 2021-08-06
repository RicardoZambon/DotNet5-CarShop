import { Component } from '@angular/core';
import { IHeaderAngularComp } from '@ag-grid-community/angular';
import { IHeaderParams } from '@ag-grid-community/core';

@Component({
  selector: 'app-grid-header',
  templateUrl: './grid-header.component.html',
  styleUrls: ['./grid-header.component.scss']
})
export class GridHeaderComponent implements IHeaderAngularComp {
    
    public params!: IHeaderParams;
    public loadingRows = true;

    public get sortAsc(): boolean { return this.params?.column?.getSort() === 'asc'; }
    public get sortDesc(): boolean { return this.params?.column?.getSort() === 'desc'; }

    constructor() {
    }
  
    agInit(params: IHeaderParams): void {
        this.params = params;

        params.api.addEventListener('successCallback', () => {
            this.loadingRows = false;
        });

        params.api.addEventListener('failCallback', () => {
            this.loadingRows = false;
        });

    }

    refresh(): boolean {
        return true;
    }

    sort() {
        if (!this.loadingRows) {
            this.loadingRows = true;
            
            this.params.progressSort();
        }
    }
}