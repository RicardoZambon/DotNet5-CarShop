import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MessageModel } from '../../models/message-model';

@Component({
    selector: 'app-delete-modal',
    templateUrl: './delete-modal.component.html',
    styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

    @Input() modalId!: string;
    @Input() messageModel!: MessageModel;

    @Output() confirmed = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

    confirmClick(): void {
        this.confirmed.emit();
    }

    public get title() {
        return this.messageModel.title
    }
}