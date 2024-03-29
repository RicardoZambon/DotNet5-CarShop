import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { AlertService } from './../../services/alert.service';
import { ButtonComponent } from '../../components/common/button/button.component';
import { MenuItem } from '../../components/common/button-dropdown/menu-item';
import { MessageModel } from '../../models/message-model';

@Component({
    selector: 'app-export-button',
    templateUrl: './export-button.component.html',
    styleUrls: ['./export-button.component.scss']
})
export class ExportButtonComponent implements OnInit {

    @Input() exportFileName: string = 'exported-data';
    @ViewChild('exportButton') exportButton!: ButtonComponent;

    @Input() alertMessageModel!: MessageModel;
    @Input() alertFailureMessage!: string;

    @Input() export?: (option: string) => Promise<Blob>;

    exportOptions: Array<MenuItem> = [
        new MenuItem('csc', 'CSV', 'file-csv', async () => { await this.click('csv'); }),
        new MenuItem('xlsx', 'XLSX', 'file-excel', async () => { await this.click('xlsx'); })
    ];
    

    constructor(private alertService: AlertService) { }

    ngOnInit(): void {
    }


    async click(option: string): Promise<void> {
        if (this.export) {
            await this.export(option)
                .then(data => {
                    this.downloadFile(option, data);

                    this.alertService.raiseSuccess(MessageModel.fromMessageModel(this.alertMessageModel));
                    this.exportButton.completeLoading();
                }, (ex: Blob) => {
                    ex.text().then(exTxt => {
                        this.alertService.raiseError(new MessageModel('AlertFailure-Title', this.alertFailureMessage, false, false), exTxt);
                        this.exportButton.cancelLoadingWithError()
                    });
                });
        }
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