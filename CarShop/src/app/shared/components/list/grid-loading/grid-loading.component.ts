import { Component } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-grid-loading',
  templateUrl: './grid-loading.component.html'
})
export class GridLoadingRendererComponent implements AgRendererComponent {

    error = false;
    loading = true;
    params!: any;

    constructor() { }

    refresh(params: ICellRendererParams): boolean {
        this.update(params);
        return true;
    }

    agInit(params: ICellRendererParams): void {
        this.update(params);

        params.api.addEventListener('failCallback', () => {
            if (this.loading) {
                this.loading = false;
                this.error = true;
            }
        });
    }

    update(params: ICellRendererParams): void {
        this.loading = params.value === undefined;
        if (this.loading) {
            this.error = false;
        }

        params.node.selectable = !this.loading;
        this.params = params;
    }
}