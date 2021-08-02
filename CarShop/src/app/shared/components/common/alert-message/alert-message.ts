import { MessageModel } from '../../../models/message-model';
export class AlertMessage {
    color!: string;
    icon!: string;
    message!: MessageModel;
    
    error = false;
    errorMessage = '';
    validation = false;

    show = false;
}