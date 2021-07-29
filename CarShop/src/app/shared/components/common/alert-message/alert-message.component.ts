import { Component, OnInit, Input, AfterViewInit, HostListener } from '@angular/core';

import { AlertMessage } from './alert-message';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit, AfterViewInit {
    
    @Input() alertMessage!: AlertMessage;

    private timeRun: number = 6000;

    private startTime?: number;
    private timeoutDelay?: NodeJS.Timeout;
    private pauseTimeout?: number;

    constructor(private alertService: AlertService) { }

    ngOnInit(): void {

    }

    ngAfterViewInit() {
        this.startTime = new Date().getTime();
        this.timeoutDelay = setTimeout(() => this.timeoutRemoveAlert(), this.timeRun);
    }
    

    @HostListener('mouseover') onMouseOver() {
        this.pauseAlert();
    }
    @HostListener('mouseout') onMouseOut() {
        this.resumeAlert();
    }

    dismiss() {
        if (this.timeoutDelay) {
            clearTimeout(this.timeoutDelay);
            this.timeoutDelay = undefined;
            this.pauseTimeout = undefined;
        }

        this.timeoutRemoveAlert();
    }

    private pauseAlert() {
        if (this.startTime && this.timeoutDelay) {
            this.pauseTimeout = this.timeRun - (new Date().getTime() - this.startTime);

            if (this.pauseTimeout > 0) {
                clearTimeout(this.timeoutDelay);
                this.timeoutDelay = undefined;
            }
            else {
                this.pauseTimeout = undefined;
            }
        }
    }

    private resumeAlert() {
        if (this.pauseTimeout) {
            this.timeRun = this.pauseTimeout;
            this.startTime = new Date().getTime();

            this.timeoutDelay = setTimeout(() => this.timeoutRemoveAlert(), this.timeRun);
        }
    }

    private timeoutRemoveAlert() {
        this.alertService.removeAlert(this.alertMessage);
    }
}