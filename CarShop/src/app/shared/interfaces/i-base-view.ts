import { EventEmitter, QueryList } from '@angular/core';

import { EditSectionComponent } from '../components/edit/edit-section/edit-section.component';

export interface IBaseView {
    
    currentUrl: string;
    entityId?: number;
    
    title?: string;

    titleUpdated: EventEmitter<void>;

    titles?: QueryList<EditSectionComponent>;

    get formDisabled(): boolean;
    
    
    initTab(): Promise<void>

    refresh(): Promise<void>;

    refreshModel(model?: any): Promise<void>;

    isValid(): boolean;

    showValidation(): void;

    disableForm(): void;

    saveView(): Promise<any>;
}