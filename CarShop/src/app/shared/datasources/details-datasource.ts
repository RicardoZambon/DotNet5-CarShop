import { ElementRef, QueryList, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AlertService } from 'src/app/shared/services/alert.service';
import { EditInputComponent } from '../components/edit/edit-input/edit-input.component';
import { IDetailsDatasource } from '../interfaces/i-details-datasource';
import { TabService } from 'src/app/shared/services/tab.service';
import { MessageModel } from '../models/message-model';
import { ViewBaseDatasource } from './view-base-datasource';

export abstract class DetailsDatasource extends ViewBaseDatasource implements IDetailsDatasource {
    
    abstract get url(): string;
    abstract formElement: ElementRef<HTMLFormElement>
    abstract inputs: QueryList<EditInputComponent>;
    
    abstract get title(): string;
    abstract model: any | null = null;
    abstract refreshTab: EventEmitter<{ entityId: string | null, url: string }>;
    
    entityId: number | null = null;
    dataForm!: FormGroup;


    constructor(
        protected alertService: AlertService,
        protected tabService: TabService,
        protected route: ActivatedRoute
    ) {
        super()
    }

    abstract dataFormSetup(): FormGroup;
    abstract getNewModel(model: any | null): any;
    abstract getModel(entityId: number | null): Promise<any>;
    abstract validate(): string[];
    abstract save(): Promise<any>;
    

    async initDetails() {
        this.dataForm = this.dataFormSetup();
        
        this.dataForm.disable();

        this.dataForm.valueChanges.subscribe(() => {
            if (this.dataForm.dirty) {
                this.tabService.setChangedValues(this.url);
            }
        });
        
        await this.refresh();
    }

    async refresh(model: any | null = null) : Promise<void> {
        if (model?.id) {
            if (!this.entityId) {
                this.entityId = model.id;
                this.tabService.redirectCurrentTab(this.url);
            }
        }
        else if (!this.entityId) {
            const id = this.route.snapshot.paramMap.get('id');
            if (id) {
                this.entityId = parseInt(id.toString());
            }
        }
        else if (this.entityId && model === null) {
            this.entityId = null;
            this.tabService.redirectCurrentTab(this.url);
        }

        await this.refreshModel();
    }
    async refreshModel(): Promise<void> {
        this.dataForm.disable();

        this.model = await this.getModel(this.entityId)
            .catch(() => {
                const tab = this.tabService.getTab(this.url);
                if (tab) {
                    this.tabService.closeTab(tab);
                }
            });
            
        this.refreshTab.emit({ entityId: this.entityId?.toString() ?? null, url: this.url });
        
        if (this.model) {
            this.dataForm.setValue(this.model);
        }

        this.dataForm.enable();

        this.tabService.clearChangedValues(this.url);
        this.dataForm.markAsUntouched();
        this.dataForm.markAsPristine();

        if (this.formElement) {    
            (this.formElement.nativeElement.querySelector('input[autofocus]') as HTMLElement)?.focus();
        }
    }

    saveValidation(message: string): void {
        Object.keys(this.dataForm.controls).forEach(field => {
            const control = this.dataForm.get(field);
            control?.markAsTouched({ onlySelf: true });
        });

        let errorMessageModel = new MessageModel('AlertValidation-Title', message, false);
        errorMessageModel.selectionName = this.title;
        errorMessageModel.validations = this.validate();
        
        this.alertService.raiseWarning(errorMessageModel);
    }

    saveFailure(ex: any, message: string): void {
        let errorMessageModel = new MessageModel('AlertFailure-Title', message, false);
        errorMessageModel.selectionName = this.title;
        this.alertService.raiseError(errorMessageModel, ex);

        this.dataForm.enable();
    }

    saveSuccess(model: any, messageModel: MessageModel): void {
        this.model = model;

        messageModel.selectionName = this.title;
        this.alertService.raiseSuccess(MessageModel.fromMessageModel(messageModel));

        this.dataForm.enable();
    }
}