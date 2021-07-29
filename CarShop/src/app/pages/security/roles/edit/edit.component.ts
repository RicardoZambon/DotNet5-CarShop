import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MessageModel } from 'src/app/shared/models/message-model';
import { RolesService } from 'src/app/shared/services/roles.service';
import { TabService } from 'src/app/shared/services/tab.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class RolesEditComponent implements OnInit {

    roleId: string | null = null;
    title: string = '';

    /* Save */
    saveClick = async () => this.save();
    saveAlertMessageModel = new MessageModel('RolesEdit-Save-Alert-Title', 'RolesEdit-Save-Alert-Message', false, false);
    

    constructor(private roleService: RolesService, private tabService: TabService, private route: ActivatedRoute) { }

    async ngOnInit(): Promise<void> {
        this.roleId = this.route.snapshot.paramMap.get('id');
        if (this.roleId) {
            const title = await this.roleService.getRoleDisplayName(parseInt(this.roleId));
            if (!title.startsWith('InternalServerError:')) {
                this.title = title;
                this.tabService.openCurrentUrl(title);
            }
            else {
                this.tabService.openCurrentUrl(`Role ID: ${this.roleId}`);
            }
        }
        else {
            this.tabService.openCurrentUrl('RolesEdit-New-Title');
        }
    }

    async save(): Promise<string> {
        return '';
    }
}