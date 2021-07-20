import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-delete-modal',
    templateUrl: './delete-modal.component.html',
    styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

    @Input() modalId!: string;

    @Input() selectedCount!: number;
    @Input() selectedName!: string;

    @Input() modalTitle!: string;
    @Input() modalMessage!: string;
    @Input() modalMessageParameter!: string;

    @Output() confirmed = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

    confirmClick(): void {
        this.confirmed.emit();
    }
}