import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { IDetailsDatasource } from '../../../../../shared/interfaces/i-details-datasource';
import { MessageModel } from 'src/app/shared/models/message-model';
import { SaveButtonComponent } from 'src/app/shared/buttons/save-button/save-button.component';

@Component({
    selector: 'app-view-role-details-buttons',
    template: `
        <app-button-group [displayName]="'ButtonGroup-Entity' | translate" [priority]="1">
            <app-save-button #saveButton
                [editDatasource]="this.details"
                [alertMessageModel]="saveAlertMessageModel"
                [alertValidationMessage]="saveAlertValidationMessage"
                [alertFailureMessage]="saveAlertFailureMessage"
                ></app-save-button>
            </app-button-group>
    `
})
export class RolesEditButtonsComponent implements OnInit {

    @Input() details!: IDetailsDatasource;

    /* Save */
    @ViewChild('saveButton') saveButton!: SaveButtonComponent;
    saveAlertMessageModel = new MessageModel('RolesEdit-Save-Alert-Title', 'RolesEdit-Save-Alert-Message', false, false);
    get saveAlertValidationMessage() { return 'RolesEdit-Save-AlertValidation-Message' + (!this.details?.entityId ? '-New' : '') };
    get saveAlertFailureMessage() { return 'RolesEdit-Save-AlertFailure-Message' + (!this.details?.entityId ? '-New' : '') };

    
    constructor() { }

    ngOnInit(): void {
    }
}