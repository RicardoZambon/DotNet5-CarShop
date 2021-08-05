import { Component, Input, ViewChild } from '@angular/core';

import { DeleteModalComponent } from 'src/app/shared/modals/delete-modal/delete-modal.component';
import { ExportButtonComponent } from 'src/app/shared/buttons/export-button/export-button.component';
import { IAppDatasource } from 'src/app/shared/interfaces/i-app-datasource';
import { MessageModel } from 'src/app/shared/models/message-model';
import { RolesService } from 'src/app/shared/services/roles.service';

@Component({
    selector: 'app-roles-list-buttons',
    templateUrl: './roles-list-buttons.component.html'
})
export class RolesListButtonsComponent {

    @Input() datasource!: IAppDatasource;

    /* New */
    newUrl = 'roles/new';

    /* Edit */
    editUrl = 'roles/{id}';

    /* Delete */
    @ViewChild('deleteModal') deleteModal!: DeleteModalComponent;
    deleteClick = async (roleIds: number[]) => this.rolesService.deleteRoles(roleIds);
    deleteConfirmMessageModel = new MessageModel('RolesList-Delete-Title', 'RolesList-Delete-Message');
    deleteAlertMessageModel = new MessageModel('RolesList-Delete-Alert-Title', 'RolesList-Delete-Alert-Message');

    /* Export */
    @ViewChild('exportButton') exportButton!: ExportButtonComponent;
    exportClick = async (option: string) => this.export(option);
    exportAlertMessageModel = new MessageModel('RolesList-Export-Alert-Title', 'RolesList-Export-Alert-Message', false, false);


    constructor(private rolesService: RolesService) { }


    async export(option: string): Promise<Blob> {
        return await this.rolesService.exportRoles(option, this.datasource.queryParameters);
    }
}