import { ElementRef, QueryList, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AlertService } from 'src/app/shared/services/alert.service';
import { BaseChildView } from './base-child-view';
import { EditInputComponent } from '../components/edit/edit-input/edit-input.component';
import { IDetailsView } from '../interfaces/i-details-view';
import { MessageModel } from '../models/message-model';
import { TabService } from 'src/app/shared/services/tab.service';

export abstract class DetailsView extends BaseChildView implements IDetailsView {
    
    abstract formElement: ElementRef<HTMLFormElement>
    abstract inputs: QueryList<EditInputComponent>;
    
    abstract model: any | null;
    abstract refreshTab: EventEmitter<{ entityId: string | null, url: string }>;

    abstract saveMessageModel: MessageModel;
    abstract get saveValidationMessage(): string;
    abstract get saveFailureMessage(): string;
    
    dataForm!: FormGroup;

    get formDisabled(): boolean { return this.dataForm.disabled; }


    constructor(
        alertService: AlertService,
        tabService: TabService,
        route: ActivatedRoute
    ) {
        super(alertService, tabService, route);
    }

    abstract dataFormSetup(): FormGroup;
    abstract getNewModel(model: any | null): any;
    abstract getModel(entityId?: number): Promise<any>;
    abstract validate(): string[];
    abstract save(): Promise<any>;


    async initTab(): Promise<void> {
        this.dataForm = this.dataFormSetup();
        
        this.dataForm.disable();

        this.dataForm.valueChanges.subscribe(() => {
            if (this.dataForm.dirty) {
                this.tabService.setChangedValues(this.currentUrl);
            }
        });
        
        super.initTab();
    }

    async refreshModel(model?: any): Promise<void> {
        super.refreshModel(model);
        
        this.dataForm.disable();

        this.model = await this.getModel(this.entityId)
            .catch(() => {
                const tab = this.tabService.getTab(this.currentUrl);
                if (tab) {
                    this.tabService.closeTab(tab);
                }
            });
        
        if (this.model) {
            this.dataForm.setValue(this.model);
        }

        this.dataForm.enable();

        this.dataForm.markAsUntouched();
        this.dataForm.markAsPristine();

        if (this.formElement) {    
            (this.formElement.nativeElement.querySelector('input[autofocus]') as HTMLElement)?.focus();
        }
    }



    isValid(): boolean {
        return this.dataForm.valid;
    }

    showValidation(): void {
        Object.keys(this.dataForm.controls).forEach(field => {
            const control = this.dataForm.get(field);
            control?.markAsTouched({ onlySelf: true });
        });

        let errorMessageModel = new MessageModel('AlertValidation-Title', this.saveValidationMessage, false);
        errorMessageModel.selectionName = this.title ?? '';
        errorMessageModel.validations = this.validate();
        
        this.alertService.raiseWarning(errorMessageModel);
    }
    

    disableForm(): void {
        this.dataForm.disable();
    }

    
    async saveView(): Promise<any> {
        return await this.save()
            .then(data => {
                this.saveSuccess(data);

            }, ex => {
                this.saveFailure(ex);
                throw ex;
            });
    }
    
    saveFailure(ex: any): void {
        let errorMessageModel = new MessageModel('AlertFailure-Title', this.saveFailureMessage, false);
        errorMessageModel.selectionName = this.title ?? '';
        this.alertService.raiseError(errorMessageModel, ex);

        this.dataForm.enable();
    }

    saveSuccess(model: any): void {
        this.model = model;

        this.saveMessageModel.selectionName = this.title ?? '';
        this.alertService.raiseSuccess(MessageModel.fromMessageModel(this.saveMessageModel));

        this.dataForm.enable();
    }
}