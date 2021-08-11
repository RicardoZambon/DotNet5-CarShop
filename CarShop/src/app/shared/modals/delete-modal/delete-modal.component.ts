import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';

import { IListDatasource } from 'src/app/shared/interfaces/i-list-datasource';
import { MessageModel } from '../../models/message-model';
import { IModal } from '../IModal';

@Component({
    selector: 'app-delete-modal',
    templateUrl: './delete-modal.component.html',
    styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit, IModal {

    @ViewChild('modal') modalElement!: ElementRef<HTMLDivElement>;
    modal!: Modal;

    @Input() datasource!: IListDatasource;
    @Input() messageModel!: MessageModel;

    @Output() confirmed = new EventEmitter();

    get title() {
        return this.messageModel.title
    }


    constructor() { }

    ngOnInit(): void {
        this.datasource.selectionChanged.subscribe(event => {
            const selectedNodes = event.api.getSelectedNodes();
            this.messageModel.selectionCount = selectedNodes.length;
            
            if (this.messageModel.selectionCount === 1)  {
                this.messageModel.selectionName = this.datasource.getRowNodeDisplayName(selectedNodes[0].data);
            }
        });
    }

    ngAfterViewInit(): void {
        this.modal = new Modal(this.modalElement.nativeElement);
    }


    show(): void {
        this.modal.show();
    }

    confirmClick(): void {
        this.confirmed.emit();
    }
}