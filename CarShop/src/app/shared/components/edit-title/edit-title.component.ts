import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-edit-title',
    templateUrl: './edit-title.component.html',
    styleUrls: ['./edit-title.component.scss']
})
export class EditTitleComponent implements OnInit {

    @Input() Icon: string = '';

    constructor() { }

    ngOnInit(): void {
    }
}