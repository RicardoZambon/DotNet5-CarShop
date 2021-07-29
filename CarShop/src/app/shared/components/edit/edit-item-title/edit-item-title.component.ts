import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Collapse } from 'bootstrap';

@Component({
    selector: 'app-edit-item-title',
    templateUrl: './edit-item-title.component.html',
    styleUrls: ['./edit-item-title.component.scss'],
    host: { class: 'accordion-item' }
})
export class EditItemTitleComponent implements OnInit, AfterViewInit {

    @Input('id') id!: string;
    @Input() label!: string;

    @ViewChild('panel') panel!: ElementRef<HTMLDivElement>;
    collapse!: Collapse;
    collapsed: boolean = false;


    constructor() { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.collapse = new Collapse(this.panel.nativeElement);
        this.collapse.show();
    }

    click(): void {
        this.collapse.toggle();
        this.collapsed = !this.collapsed;
    }
}