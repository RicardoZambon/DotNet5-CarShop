import { FormGroup } from '@angular/forms';

import { MessageModel } from '../models/message-model';

export interface IDetailsDatasource {
    entityId: number | null;
    get title(): string;

    model: any | null;
    dataForm: FormGroup;

    refresh(model: any | null) : Promise<void>;

    validate(): string[];
    save(): Promise<any>;

    saveValidation(message: string): void;
    saveFailure(ex: any, message: string): void;
    saveSuccess(model: any, messageModel: MessageModel): void;
}