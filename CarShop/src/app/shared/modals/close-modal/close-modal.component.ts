import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { Modal } from 'bootstrap';

import { Tab } from './../../components/common/tabs/tab';
import { IModal } from '../IModal';

@Component({
  selector: 'app-close-modal',
  templateUrl: './close-modal.component.html',
  styleUrls: ['./close-modal.component.scss']
})
export class CloseModalComponent implements OnInit, AfterViewInit, IModal {

    @ViewChild('modal') modalElement!: ElementRef<HTMLDivElement>;
    modal!: Modal;
    tab!: Tab;

    @Output() close = new EventEmitter<Tab>();

    constructor() { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.modal = new Modal(this.modalElement.nativeElement);
    }


    show(tab: Tab): void {
        this.tab = tab;
        this.modal.show();
    }

    confirmClick(): void {
        this.close.emit(this.tab);
    }
}