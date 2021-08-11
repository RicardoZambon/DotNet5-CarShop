import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AlertService } from 'src/app/shared/services/alert.service';
import { DetailsDatasource } from 'src/app/shared/datasources/details-datasource';
import { RolesService } from 'src/app/shared/services/roles.service';
import { TabService } from 'src/app/shared/services/tab.service';
import { EditDatasource } from 'src/app/shared/datasources/edit-datasource';

@Component({
    selector: 'app-edit',
    templateUrl: './roles-edit.component.html'
})
export class RolesEditComponent extends EditDatasource implements OnInit {
    
    private _details!: DetailsDatasource;
    get details() {
        return this._details;
    }
    @ViewChild('details', { static: true }) set details(value: DetailsDatasource) {
        if (value) {
            this._details = value;
            console.log('set details');
        }
    }

    failureMessage = 'RolesEdit-Title-AlertFailure-Message';

    
    constructor(
        private roleService: RolesService,
        protected alertService: AlertService,
        protected tabService: TabService,
        protected route: ActivatedRoute,
    ) {
        super(alertService, tabService, route);
    }

    async ngOnInit(): Promise<void> {
        await this.initTab();
    }


    async getTitle(): Promise<string> {
        if (this.entityId) {
            return await this.roleService.getRoleDisplayName(this.entityId);
        }
        return 'RolesEdit-Title-New';
    }
}