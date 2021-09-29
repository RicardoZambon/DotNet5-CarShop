import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { SaveButtonComponent } from 'src/app/shared/buttons/save-button/save-button.component';

@Component({
    selector: 'app-view-role-details-buttons',
    template: `
        <app-button-group [displayName]="'ButtonGroup-Entity' | translate" [priority]="1">
            <app-save-button #saveButton
                [tabCurrentUrl]="this.tabCurrentUrl"
            ></app-save-button>
        </app-button-group>
    `
})
export class RolesEditButtonsComponent implements OnInit {

    @Input() tabCurrentUrl!: string;

    /* Save */
    @ViewChild('saveButton') saveButton!: SaveButtonComponent;

    constructor() { }

    ngOnInit(): void {
    }
}