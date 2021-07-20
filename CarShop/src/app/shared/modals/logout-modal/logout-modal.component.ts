import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-logout-modal',
    templateUrl: './logout-modal.component.html',
    styleUrls: ['./logout-modal.component.scss']
})
export class LogoutModalComponent implements OnInit {

    @Output() logout = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

    confirmClick(): void {
        this.logout.emit();
    }
}