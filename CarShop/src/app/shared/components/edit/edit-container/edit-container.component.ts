import { Component, OnInit, ContentChildren, QueryList, ViewChild, Input } from '@angular/core';

import { EditSectionComponent } from '../edit-section/edit-section.component';
import { ScrollSpyDirective } from '../../../directives/scroll-spy/scroll-spy.directive';


@Component({
    selector: 'app-edit-container',
    templateUrl: './edit-container.component.html',
    styleUrls: ['./edit-container.component.scss']
})
export class EditContainerComponent implements OnInit {

    titles!: EditSectionComponent[];
    @ViewChild(ScrollSpyDirective) scrollSpy!: ScrollSpyDirective;

    @Input() icon!: string;
    @Input() title!: string;

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