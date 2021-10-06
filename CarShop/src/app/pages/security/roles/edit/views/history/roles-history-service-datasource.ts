import { ActivatedRoute } from '@angular/router';
import { IGetRowsParams } from '@ag-grid-community/core';

import { AlertService } from 'src/app/shared/services/alert.service';
import { AuditServicesDatasource } from 'src/app/shared/datasources/audit-services-datasource';
import { MessageModel } from 'src/app/shared/models/message-model';
import { RolesService } from 'src/app/shared/services/roles.service';
import { ServiceAuditHistoryListModel } from 'src/app/shared/models/Audit/service-audit-history-list-model';

export class RolesHistoryServiceDatasource extends AuditServicesDatasource {
    
    constructor(private rolesService: RolesService, private alertService: AlertService, protected route: ActivatedRoute) {
        super(route);
    }

    async getData(params: IGetRowsParams): Promise<ServiceAuditHistoryListModel[]> {
        return await this.rolesService.getRoleHistory(this.entityId) //params.startRow, params.endRow)
            .catch(ex => {
                this.alertService.raiseError(new MessageModel('AlertFailure-Title', 'RolesList-Loading-AlertFailure-Message', false), ex);
                throw ex;
            });
    }
}