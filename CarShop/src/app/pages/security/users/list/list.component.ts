import { Component, OnInit } from '@angular/core';
import { ScrollPositionDirective, ScrollPositionService, SW_SCROLL_POSITION_CONFIG } from '@service-work/scroll-position';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class UsersListComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }
}