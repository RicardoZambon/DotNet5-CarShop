import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AlertService } from '../../services/alert.service';
import { ButtonComponent } from '../../components/common/button/button.component';
import { MenuItem } from '../../components/common/button-dropdown/menu-item';
import { MessageModel } from '../../models/message-model';
import { TabService } from 'src/app/shared/services/tab.service';

@Component({
    selector: 'app-save-button',
    templateUrl: './save-button.component.html',
    styleUrls: ['./save-button.component.scss']
})
export class SaveButtonComponent implements OnInit {

    @ViewChild('saveButton') saveButton!: ButtonComponent;

    @Input() alertMessageModel!: MessageModel;
    @Input() alertValidationMessage!: string;
    @Input() alertFailureMessage!: string;
    @Input() formGroup!: FormGroup;

    @Input() title!: string;

    @Input() validate?: () => string[];
    @Input() save?: () => Promise<any>;

    @Output() onFinishedSaving = new EventEmitter<any>();


    saveOptions: Array<MenuItem> = [
        { label: 'Button-Save', icon: 'save', command: async () => { await this.click('save'); } },
        { label: 'Button-Save-And-Close', icon: 'save', command: async () => { await this.click('close'); } },
        { label: 'Button-Save-And-New', icon: 'save', command: async () => { await this.click('new'); } }
    ];
    

    constructor(private alertService: AlertService, private tabService: TabService) { }

    ngOnInit(): void {
    }


    async click(option: string): Promise<void> {
        if (this.save) {
            if (this.formGroup.valid) {
                this.formGroup.disable();
                
                const data = await this.save();
                this.formGroup.enable();

                if (typeof data === 'string') {
                    let errorMessageModel = new MessageModel('AlertFailure-Title', this.alertFailureMessage, false);
                    errorMessageModel.selectionName = this.title;
                    this.alertService.raiseError(errorMessageModel);
                    this.saveButton.cancelLoadingWithError();
                }
                else {
                    this.alertMessageModel.selectionName = this.title;
                    this.alertService.raiseSuccess(MessageModel.fromMessageModel(this.alertMessageModel));
                    this.saveButton.completeLoading();

                    this.saveFinished(option, data);
                }

            } else {
                Object.keys(this.formGroup.controls).forEach(field => {
                    const control = this.formGroup.get(field);
                    control?.markAsTouched({ onlySelf: true });
                });

                let errorMessageModel = new MessageModel('AlertValidation-Title', this.alertValidationMessage, false);
                errorMessageModel.selectionName = this.title;

                if (this.validate) {
                    errorMessageModel.validations = this.validate();
                }
                
                this.alertService.raiseWarning(errorMessageModel);
                this.saveButton.cancelLoadingWithWarning();
            }
        }
    }

    saveFinished(option: string, object: any) {
        switch (option) {
            case 'close': 
                this.tabService.closeCurrentTab();
                break;
            case 'new':
                this.onFinishedSaving.emit(null);
                break;
            default:
                this.onFinishedSaving.emit(object);
                break;
        }
    }
}