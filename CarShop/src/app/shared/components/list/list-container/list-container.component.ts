import { IAppDatasource } from 'src/app/shared/interfaces/i-app-datasource';
import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-list-container',
    templateUrl: './list-container.component.html',
    styleUrls: ['./list-container.component.scss']
})
export class ListContainerComponent implements OnInit {

    @ViewChild('filters') filtersElement!: ElementRef<HTMLElement>;
    
    @Input() datasource!: IAppDatasource;
    @Input() filtersWidth = 14.25;

    constructor() { }

    ngOnInit(): void {
        this.datasource.filtersShown.subscribe(() => {
            (this.filtersElement.nativeElement.querySelector('.form-control') as HTMLElement)?.focus();
        });
    }
}