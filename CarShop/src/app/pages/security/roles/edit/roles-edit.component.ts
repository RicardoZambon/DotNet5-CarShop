import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AlertService } from 'src/app/shared/services/alert.service';
import { EditContainerComponent } from 'src/app/shared/components/edit/edit-container/edit-container.component';
import { MultiView } from 'src/app/shared/views/multi-view';
import { RolesService } from 'src/app/shared/services/roles.service';
import { RoleViewDetailsComponent } from './views/details/role-details.component';
import { RoleViewHistoryComponent } from './views/history/role-history.component';
import { TabService } from 'src/app/shared/services/tab.service';
import { SubViewItem } from 'src/app/shared/views/sub-view-item';

@Component({
    selector: 'app-edit',
    templateUrl: './roles-edit.component.html'
})
export class RolesEditComponent extends MultiView implements OnInit, AfterViewInit {
    
    @ViewChild('container') editContainer!: EditContainerComponent;
    @ViewChild('details') details!: RoleViewDetailsComponent;
    @ViewChild('history') history!: RoleViewHistoryComponent;

    titleFailureMessage = 'RolesEdit-Title-AlertFailure-Message';

    get formDisabled(): boolean { return this.details.formDisabled; }

    
    constructor(
        private roleService: RolesService,
        protected alertService: AlertService,
        protected tabService: TabService,
        protected route: ActivatedRoute,
    ) {
        super(alertService, tabService, route);
    }

    async ngOnInit(): Promise<void> {
        this.viewOptions = [
            new SubViewItem('details', 'Button-Views-Details', 'dice-d6', async () => { await this.changeView('details'); }),
            new SubViewItem('history', 'Button-Views-History', 'history', async () => { await this.changeView('history'); })
        ];
    }

    async ngAfterViewInit(): Promise<void> {
        this.viewOptions[0].view = this.details;
        this.viewOptions[1].view = this.history;

        await this.initTab();
    }


    async getTitle(): Promise<string> {
        if (this.entityId) {
            return await this.roleService.getRoleDisplayName(this.entityId);
        }
        return 'RolesEdit-Title-New';
    }

    refreshViews(): void {
        this.viewOptions[1].visible = (this.entityId !== undefined);
        
        super.refreshViews();
    }


    isValid(): boolean {
        return this.details.isValid();
    }

    showValidation(): void {
        this.details.showValidation();        
    }

    disableForm(): void {
        this.details.disableForm();
    }    

    async saveView(): Promise<any> {
        return await this.details.saveView();
    }
}