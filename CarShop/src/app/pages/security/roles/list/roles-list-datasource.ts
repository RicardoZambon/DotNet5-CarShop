import { IGetRowsParams } from '@ag-grid-community/core';

import { AlertService } from 'src/app/shared/services/alert.service';
import { BaseDatasource } from 'src/app/shared/base-datasource';
import { MessageModel } from 'src/app/shared/models/message-model';
import { RolesService } from 'src/app/shared/services/roles.service';
import { RoleListModel } from 'src/app/shared/models/Security/role-list-model';

export class RolesListDatasource extends BaseDatasource {
    
    constructor(private rolesService: RolesService, private alertService: AlertService) {
        super();
    }


    getRowNodeId(data: RoleListModel): number {
        return data.id;
    }
    
    getRowNodeDisplayName(data: RoleListModel): string { 
        return data.name;
    }

    async getData(params: IGetRowsParams): Promise<RoleListModel[]> {
        return await this.rolesService.getRoles(params.startRow, params.endRow, this.queryParameters)
            .catch(ex => {
                this.alertService.raiseError(new MessageModel('AlertFailure-Title', 'RolesList-Loading-AlertFailure-Message', false), ex);
                throw ex;
            });
    }
}