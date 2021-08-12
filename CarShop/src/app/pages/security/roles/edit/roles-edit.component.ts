import { EditContainerComponent } from './../../../../shared/components/edit/edit-container/edit-container.component';
import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AlertService } from 'src/app/shared/services/alert.service';
import { RolesService } from 'src/app/shared/services/roles.service';
import { TabService } from 'src/app/shared/services/tab.service';
import { EditDatasource } from 'src/app/shared/datasources/edit-datasource';
import { RoleViewDetailsComponent } from './views/details/role-details.component';
import { RoleViewHistoryComponent } from './views/history/role-history.component';

@Component({
    selector: 'app-edit',
    templateUrl: './roles-edit.component.html'
})
export class RolesEditComponent extends EditDatasource implements OnInit, AfterViewInit {
    
    @ViewChild('container') editContainer!: EditContainerComponent;
    @ViewChild('details') details!: RoleViewDetailsComponent;
    @ViewChild('history') history!: RoleViewHistoryComponent;

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

    ngAfterViewInit(): void {
        this.refreshScrollSpy();
    }


    async getTitle(): Promise<string> {
        if (this.entityId) {
            return await this.roleService.getRoleDisplayName(this.entityId);
        }
        return 'RolesEdit-Title-New';
    }
}