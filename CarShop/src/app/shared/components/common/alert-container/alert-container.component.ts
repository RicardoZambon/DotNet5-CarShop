import { Component, OnInit } from '@angular/core';

import { AlertService } from '../../../services/alert.service';

@Component({
    selector: 'app-alert-container',
    templateUrl: './alert-container.component.html',
    styleUrls: ['./alert-container.component.scss']
})
export class AlertContainerComponent implements OnInit {

    constructor(public alertService: AlertService) {
    }

    ngOnInit(): void {
    }
}