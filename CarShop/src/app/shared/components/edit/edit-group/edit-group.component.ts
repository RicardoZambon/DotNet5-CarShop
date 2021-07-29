import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-edit-group',
    templateUrl: './edit-group.component.html',
    styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {

    @Input() groupTitle!: string;

    constructor() { }

    ngOnInit(): void {
    }
}