import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { SelectionChangedEvent } from 'ag-grid-community';

import { AlertService } from './../../services/alert.service';
import { ButtonComponent } from '../../components/common/button/button.component';
import { MessageModel } from './../../models/message-model';
import { IModal } from '../../modals/IModal';

@Component({
    selector: 'app-delete-button',
    templateUrl: './delete-button.component.html',
    styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements OnInit {

    @Input() modal!: IModal;
    @Input() grid!: AgGridAngular;

    @Input() alertMessageModel!: MessageModel;
    @Input() alertFailureMessage!: string;

    @Input() delete?: (selectedIds: number[]) => Promise<boolean>;

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
            await this.delete(rolesToDelete)
                .then(() => {
                    this.alertService.raiseSuccess(MessageModel.fromMessageModel(this.alertMessageModel), 'fa-trash-alt');

                    this.grid.api.deselectAll();
                    this.grid.api.refreshInfiniteCache();
                    this.deleteButton.completeLoading(true);

                }, ex => {
                    this.deleteButton.cancelLoadingWithError();

                    let errorMessageModel = new MessageModel('AlertFailure-Title', this.alertFailureMessage, false);
                    errorMessageModel.selectionCount = this.alertMessageModel.selectionCount;
                    errorMessageModel.selectionName = this.alertMessageModel.selectionName;
    
                    this.alertService.raiseError(errorMessageModel, ex);
                });
        }
    }
}