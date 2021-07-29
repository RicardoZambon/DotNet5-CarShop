import { Injectable } from '@angular/core';

import { AlertMessage } from '../components/common/alert-message/alert-message';
import { MessageModel } from './../models/message-model';

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

        
    }    

    removeAlert(message: AlertMessage): void {
        message.show = false;

        setTimeout(() => {
            const index = this._raisedAlerts.indexOf(message);
            if (index > -1) {
                this._raisedAlerts.splice(index, 1);
            }
        }, 1000);
    }
}