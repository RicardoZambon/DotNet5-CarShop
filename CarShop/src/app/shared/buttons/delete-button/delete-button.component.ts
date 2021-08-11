import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { AlertService } from './../../services/alert.service';
import { ButtonComponent } from '../../components/common/button/button.component';
import { IModal } from '../../modals/IModal';
import { IListDatasource } from '../../interfaces/i-list-datasource';
import { MessageModel } from './../../models/message-model';

@Component({
    selector: 'app-delete-button',
    templateUrl: './delete-button.component.html',
    styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements OnInit {

    @Input() modal!: IModal;
    @Input() datasource!: IListDatasource;

    @Input() alertMessageModel!: MessageModel;
    @Input() alertFailureMessage!: string;

    @Input() delete?: (selectedIds: number[]) => Promise<boolean>;

    @ViewChild('deleteButton') deleteButton!: ButtonComponent;

    disabled = true;


    constructor(private alertService: AlertService) { }

    ngOnInit(): void {
        this.datasource.selectionChanged.subscribe(event => {
            const selectedNodes = event.api.getSelectedNodes();

            this.alertMessageModel.selectionCount = selectedNodes.length;

            this.disabled = this.alertMessageModel.selectionCount <= 0;
            
            if (this.alertMessageModel.selectionCount === 1)  {
                this.alertMessageModel.selectionName = this.datasource.getRowNodeDisplayName(selectedNodes[0].data);
            }
        });
    }

    async click(): Promise<void> {
        this.deleteButton.startLoading();

        if (this.delete) {
            const rolesToDelete = this.datasource.getSelectedNodes().map(x => Number(x.id));
            await this.delete(rolesToDelete)
                .then(() => {
                    this.alertService.raiseSuccess(MessageModel.fromMessageModel(this.alertMessageModel), 'fa-trash-alt');

                    this.datasource.deselectAll();
                    this.datasource.refreshData();
                    this.deleteButton.completeLoading();

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