import { Component, OnInit, ContentChildren, QueryList, ViewChild, Input } from '@angular/core';

import { EditSectionComponent } from '../edit-section/edit-section.component';
import { ScrollSpyDirective } from '../../../directives/scroll-spy/scroll-spy.directive';


@Component({
    selector: 'app-edit-container',
    templateUrl: './edit-container.component.html',
    styleUrls: ['./edit-container.component.scss']
})
export class EditContainerComponent implements OnInit {

    @ViewChild(ScrollSpyDirective) scrollSpy!: ScrollSpyDirective;

    @Input() icon!: string;
    @Input() title!: string;

    private _titles!: EditSectionComponent[];
    public get titles(): EditSectionComponent[] {
        return this._titles;
    }
    public set titles(value: EditSectionComponent[]) {
        this.hasTitles = (value?.length ?? 0) !== 0;
        this._titles = value;
    }

    public hasTitles: boolean = false;
    public activeSection: number = 0;

    constructor() {
    }

    ngOnInit(): void {
    }


    onSectionChange(section: number | null): void {
        this.activeSection = section ?? 0;
    }

    scrollTo(section: number) {
        this.scrollSpy.scrollTo(section);
    }
}