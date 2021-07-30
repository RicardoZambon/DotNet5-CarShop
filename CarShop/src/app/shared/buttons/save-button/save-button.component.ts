import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AlertService } from '../../services/alert.service';
import { ButtonComponent } from '../../components/common/button/button.component';
import { MenuItem } from '../../components/common/button-dropdown/menu-item';
import { MessageModel } from '../../models/message-model';
import { delay } from 'rxjs/operators';
import { from } from 'rxjs';

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
    @Input() save?: () => Promise<string>;

    saveOptions: Array<MenuItem> = [
        { label: 'Button-Save', icon: 'save', command: async () => { await this.click('save'); } },
        { label: 'Button-Save-And-Close', icon: 'save', command: async () => { await this.click('close'); } },
        { label: 'Button-Save-And-New', icon: 'save', command: async () => { await this.click('new'); } }
    ];
    

    constructor(private alertService: AlertService) { }

    ngOnInit(): void {
    }


    async click(option: string): Promise<void> {
        if (this.save) {
            if (this.formGroup.valid) {
                this.formGroup.disable();
                
                const data = await from(await this.save()).pipe(delay(3000)).toPromise();
                this.formGroup.enable();

                if (data === '') {
                    this.alertService.raiseSuccess(MessageModel.fromMessageModel(this.alertMessageModel));
                    this.saveButton.completeLoading();
                }
                else {
                    let errorMessageModel = new MessageModel('AlertFailure-Title', this.alertFailureMessage, false);
                    errorMessageModel.selectionName = this.title;
                    this.alertService.raiseError(errorMessageModel);
                    this.saveButton.cancelLoadingWithError();
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
}