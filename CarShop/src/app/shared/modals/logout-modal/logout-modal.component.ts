import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { Modal } from 'bootstrap';

import { IModal } from '../IModal';

@Component({
    selector: 'app-logout-modal',
    templateUrl: './logout-modal.component.html',
    styleUrls: ['./logout-modal.component.scss']
})
export class LogoutModalComponent implements OnInit, AfterViewInit, IModal {

    @ViewChild('modal') modalElement!: ElementRef<HTMLDivElement>;
    modal!: Modal;
    
    @Output() logout = new EventEmitter();

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
        this.logout.emit();
    }
}