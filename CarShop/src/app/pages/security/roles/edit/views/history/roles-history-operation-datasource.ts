import { ActivatedRoute } from '@angular/router';
import { IGetRowsParams } from '@ag-grid-community/core';

import { AlertService } from 'src/app/shared/services/alert.service';
import { AuditOperationsDatasource } from 'src/app/shared/datasources/audit-operations-datasource';
import { MessageModel } from 'src/app/shared/models/message-model';
import { OperationAuditHistoryListModel } from 'src/app/shared/models/Audit/operation-audit-history-list-model';
import { RolesService } from 'src/app/shared/services/roles.service';

export class RolesHistoryOperationDatasource extends AuditOperationsDatasource {
    
    constructor(private rolesService: RolesService, private alertService: AlertService, protected route: ActivatedRoute) {
        super(route);
    }

    async getData(params: IGetRowsParams): Promise<OperationAuditHistoryListModel[]> {
        return await this.rolesService.getRoleHistoryOperations(this.serviceId) //params.startRow, params.endRow)
            .catch(ex => {
                this.alertService.raiseError(new MessageModel('AlertFailure-Title', 'RolesList-Loading-AlertFailure-Message', false), ex);
                throw ex;
            });
    }
}