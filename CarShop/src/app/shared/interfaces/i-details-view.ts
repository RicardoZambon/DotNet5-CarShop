import { FormGroup } from '@angular/forms';

import { IBaseChildView } from './i-base-child-view';
import { MessageModel } from '../models/message-model';

export interface IDetailsView extends IBaseChildView {
    model: any | null;
    dataForm: FormGroup;

    refresh(model?: any) : Promise<void>;

    validate(): string[];
    save(): Promise<any>;

    saveFailure(ex: any, message: string): void;
    saveSuccess(model: any, messageModel: MessageModel): void;
}