import { MessageModel } from './../models/message-model';
import { Injectable } from '@angular/core';

import { AlertMessage } from './../components/alert-message/alert-message';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    private _raisedAlerts = new Array<AlertMessage>();

    public get raisedAlerts(): Array<AlertMessage> {
        return this._raisedAlerts;
    }

    constructor() { }


    raiseInfo(messageModel: MessageModel, icon: string = 'fa-info'): void {
        this.raiseAlert(messageModel, icon, 'primary');
    }
    raiseWarning(messageModel: MessageModel, icon: string = 'fa-exclamation'): void {
        this.raiseAlert(messageModel, icon, 'warning');
    }
    raiseError(messageModel: MessageModel, icon: string = 'fa-bug'): void {
        this.raiseAlert(messageModel, icon, 'danger', true);
    }
    raiseSuccess(messageModel: MessageModel, icon: string = 'fa-check'): void {
        this.raiseAlert(messageModel, icon, 'success');
    }
    

    raiseAlert(messageModel: MessageModel, icon: string, color: string, error: boolean = false): void {
        let alertMessage = new AlertMessage();

        alertMessage.color = color;
        alertMessage.icon = icon;
        alertMessage.message = messageModel;
        alertMessage.error = error;

        this._raisedAlerts.push(alertMessage);

        setTimeout(() => {
            alertMessage.show = true;
        }, 500);

        setTimeout(() => {
            alertMessage.show = false;

            setTimeout(() => {
                this.removeAlert(alertMessage);
            }, 1000);
        }, 5000);
    }

    private removeAlert(message: AlertMessage): void {
        const index = this._raisedAlerts.indexOf(message);
        if (index > -1) {
            this._raisedAlerts.splice(index, 1);
        }
    }
}