import { Component } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';

@Component({
  selector: 'app-grid-header',
  templateUrl: './grid-header.component.html'
})
export class GridHeaderComponent implements IHeaderAngularComp {
    
    public params!: IHeaderParams;

    constructor() {
    }
  
    agInit(params: IHeaderParams): void {
        this.params = params;
    }

    refresh(params: IHeaderParams): boolean {
        return true;
    }
}