import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { SelectionChangedEvent } from 'ag-grid-community';

import { AlertService } from './../../services/alert.service';
import { ButtonComponent } from '../../components/common/button/button.component';
import { MessageModel } from './../../models/message-model';

@Component({
    selector: 'app-delete-button',
    templateUrl: './delete-button.component.html',
    styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements OnInit {

    @Input() modalId!: string;
    @Input() grid!: AgGridAngular;

    @Input() alertMessageModel!: MessageModel;
    @Input() alertFailureMessage!: string;

    @Input() delete?: (selectedIds: number[]) => Promise<string | boolean>;

    @ViewChild('deleteButton') deleteButton!: ButtonComponent;

    disabled = true;


    constructor(private alertService: AlertService) { }

    ngOnInit(): void {
        this.grid.selectionChanged.subscribe((event: SelectionChangedEvent) => {
            this.disabled = event.api.getSelectedNodes().length <= 0;
        });
    }

    async click(): Promise<void> {
        
        this.deleteButton.startLoading();

        if (this.delete) {
            const rolesToDelete = this.grid.api.getSelectedNodes().map(x => Number(x.id));
            const result = await this.delete(rolesToDelete);

            if (typeof result === 'string') {
                this.deleteButton.cancelLoading(true);

                let errorMessageModel = new MessageModel('AlertFailure-Title', this.alertFailureMessage, false);
                errorMessageModel.selectionCount = this.alertMessageModel.selectionCount;
                errorMessageModel.selectionName = this.alertMessageModel.selectionName;

                this.alertService.raiseError(errorMessageModel);
            }
            else {
                this.alertService.raiseSuccess(MessageModel.fromMessageModel(this.alertMessageModel), 'fa-trash-alt');

                this.grid.api.deselectAll();
                this.grid.api.refreshInfiniteCache();
                this.deleteButton.completeLoading(true);
            }
        }
    }
}