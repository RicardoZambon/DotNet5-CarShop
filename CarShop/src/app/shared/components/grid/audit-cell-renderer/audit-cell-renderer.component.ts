import { Component } from '@angular/core';
import { ICellRendererParams } from '@ag-grid-community/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';

import { ServiceAuditHistoryListModel } from 'src/app/shared/models/Audit/service-audit-history-list-model';

@Component({
    selector: 'app-audit-cell-renderer',
    template: `
    <div class="col-auto icon-container d-flex align-items-center justify-content-center"
        [class.first-row]="this.firstRow"
        [class.last-row]="this.lastRow"
    >
        <div class="icon"></div>
    </div>
    <div class="col">
        <div class="row mb-1">
            <div class="col service">{{ this.name }}</div>
        </div>
        <div class="row">
            <span class="col pe-2 username">{{ this.username }}</span>
            <span class="col-auto date-time">{{ this.dateTime | date : ('AuditList-DateTime-Format' | translate) }}</span>
        </div>
    </div>`,
    styleUrls: [ './audit-cell-renderer.component.scss' ]
})
export class AuditCellRendererComponent implements ICellRendererAngularComp {
    
    public firstRow: boolean = false;
    public lastRow: boolean = false;

    public name: string = '';
    public username: string = '';
    public dateTime: Date | '' = '';

    refresh(params: ICellRendererParams): boolean {
        this.update(params);
        return true;
    }

    agInit(params: ICellRendererParams): void {
        this.update(params);
    }

    update(params: ICellRendererParams): void {
        const data = params.data as ServiceAuditHistoryListModel;
        if (data) {
            const name = data.name;

            this.name = name.substring(name.indexOf('/') + 1, name.length);

            this.username = data.changedByUsername;
            this.dateTime = data.changedOn;

            if (params.rowIndex === 0) {
                this.firstRow = true;
            }

            if (params.api.isLastRowIndexKnown() && params.rowIndex === params.api.getLastRenderedRow()) {
                this.lastRow = true;
            }
        }
    }
}