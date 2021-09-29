import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { Collapse } from 'bootstrap';

@Component({
    selector: 'app-edit-section',
    templateUrl: './edit-section.component.html',
    styleUrls: ['./edit-section.component.scss'],
    host: {
        '[class.accordion-item]': 'fullHeight',
        '[class.d-flex]': 'fullHeight',
        '[class.h-100]': 'fullHeight',
        '[class.flex-column]': 'fullHeight',
        '[class.pb-1]': 'fullHeight'
    }
})
export class EditSectionComponent implements OnInit, AfterViewInit {

    @Input('id') id!: string;
    @Input() label!: string;
    @Input() fullHeight: boolean = false;

    @ViewChild('panel') panel!: ElementRef<HTMLDivElement>;
    collapse!: Collapse;
    collapsed = false;

    firstLoad = true;


    constructor() { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.collapse = new Collapse(this.panel.nativeElement);
        this.collapse.show();

        setTimeout(() => {
            this.firstLoad = false;
        }, 1000);
    }


    click(): void {
        if (!this.fullHeight) {
            this.collapse.toggle();
            this.collapsed = !this.collapsed;
        }
    }
}