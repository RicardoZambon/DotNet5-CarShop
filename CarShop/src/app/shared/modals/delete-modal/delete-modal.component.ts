import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';

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
    
    @Input() modalId!: string;
    @Input() messageModel!: MessageModel;

    @Output() confirmed = new EventEmitter();

    get title() {
        return this.messageModel.title
    }


    constructor() { }

    ngOnInit(): void {
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