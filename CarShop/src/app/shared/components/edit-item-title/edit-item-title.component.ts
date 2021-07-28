import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-edit-item-title',
    templateUrl: './edit-item-title.component.html',
    styleUrls: ['./edit-item-title.component.scss'],
    host: { class: 'accordion-item' }
})
export class EditItemTitleComponent implements OnInit {

    @Input('id') id!: string;
    
    @Input() label!: string;


    constructor() { }

    ngOnInit(): void {
    }
}