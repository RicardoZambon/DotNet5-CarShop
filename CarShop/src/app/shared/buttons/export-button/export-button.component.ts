import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { MenuItem } from '../../components/button-dropdown/menu-item';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
    selector: 'app-export-button',
    templateUrl: './export-button.component.html',
    styleUrls: ['./export-button.component.scss']
})
export class ExportButtonComponent implements OnInit {

    @Input() exportFileName: string = 'exported-data';
    @ViewChild('exportButton') exportButton!: ButtonComponent;

    @Input() export?: (option: string) => Promise<Blob | null>;

    exportOptions: Array<MenuItem> = [
        { label: 'CSV', icon: 'file-csv', command: async () => { await this.click('csv'); } },
        { label: 'XLSX', icon: 'file-excel', command: async () => { await this.click('xlsx'); } }
    ];
    

    constructor() { }

    ngOnInit(): void {
    }

    async click(option: string): Promise<void> {
        if (this.export) {
            const data = await this.export(option);
            if (data) {
                this.downloadFile(option, data);
            }
        }
        this.exportButton.completeLoading();
    }

    protected downloadFile(option: string, data: Blob): void {
        let extension: string = '';
        let blob: Blob | null = null;

        switch (option) {
            case 'csv':
                blob = new Blob([data], { type: 'text/csv' });
                extension = 'csv';
                break;
            case 'xlsx':
                blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                extension = 'xlsx';
                break;
        }

        if (blob) {
            const url = window.URL.createObjectURL(blob);

            var link = document.createElement('a');
            link.href = url;
            link.download = `${this.exportFileName}.${extension}`;
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

            setTimeout(function () {
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(url);
                link.remove();
            }, 100);
        }
    }
}