import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/core';

import { OperationAuditHistoryListModel } from 'src/app/shared/models/Audit/operation-audit-history-list-model';

@Component({
  selector: 'app-audit-operation-cell-renderer',
  template: `
    <div class="row mb-1">
        <div class="col operation">{{ this.operationType }}</div>
    </div>
    <div class="row g-0">
        <span class="col-auto entity pe-2">
            {{ this.entityName }}
        </span>
        <span class="col-auto entity-id">
            {{ this.entityID }}
        </span>
    </div>
  `,
  host: {
      '[class.d-none]': '!show'
  },
  styleUrls: ['./audit-operation-cell-renderer.component.scss']
})
export class AuditOperationCellRendererComponent implements ICellRendererAngularComp {

    public operationType: string = '';
    public entityName: string = '';
    public entityID: number | undefined;

    public show: boolean = false;

    constructor() { }

    refresh(params: ICellRendererParams): boolean {
        this.update(params);
        return true;
    }

    agInit(params: ICellRendererParams): void {
        this.update(params);
    }

    update(params: ICellRendererParams): void {
        const data = params.data as OperationAuditHistoryListModel;
        if (data) {
            this.show = true;

            this.operationType = data.operationType;
            this.entityName = data.entityName;
            this.entityID = data.entityID;

        }
        else {
            params.api.applyTransaction({ remove: [params.data] })
            // console.log(params.node);
            // params.api.removeItems([params.node], true);
        }
    }
}