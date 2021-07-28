import { Component, OnInit, ContentChildren, QueryList, ViewChild } from '@angular/core';

import { EditItemTitleComponent } from './../edit-item-title/edit-item-title.component';
import { ScrollSpyDirective } from '../../directives/scroll-spy/scroll-spy.directive';


@Component({
    selector: 'app-edit-container',
    templateUrl: './edit-container.component.html',
    styleUrls: ['./edit-container.component.scss']
})
export class EditContainerComponent implements OnInit {

    @ContentChildren(EditItemTitleComponent, { descendants: true }) titles!: QueryList<EditItemTitleComponent>;
    @ViewChild(ScrollSpyDirective) scrollSpy!: ScrollSpyDirective;

    public activeSection: number = 0;

    constructor() { }

    ngOnInit(): void {
    }

    onSectionChange(section: number | null): void {
        this.activeSection = section ?? 0;
    }

    scrollTo(section: number) {
        this.scrollSpy.scrollTo(section);
    }
}