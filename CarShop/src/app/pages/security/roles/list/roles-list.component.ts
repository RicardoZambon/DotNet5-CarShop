import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AlertService } from 'src/app/shared/services/alert.service';
import { BaseView } from 'src/app/shared/views/base-view';
import { TabService } from 'src/app/shared/services/tab.service';

@Component({
    selector: 'app-list',
    template: `
        <app-roles-list-buttons [datasource]="grid.datasource"></app-roles-list-buttons>
        <app-roles-list-grid class="d-flex flex-grow-1" #grid></app-roles-list-grid>
    `
})
export class RolesListComponent extends BaseView implements AfterViewInit {

    constructor(alertService: AlertService, tabService: TabService, route: ActivatedRoute) {
        super(alertService, tabService, route);
    }

    async ngAfterViewInit(): Promise<void> {
        await this.refresh();
    }


    async getTitle(): Promise<string> {
        return 'Menu-Roles';
    }
}