import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { AlertService } from '../../services/alert.service';
import { ButtonComponent } from '../../components/common/button/button.component';
import { MenuItem } from '../../components/common/button-dropdown/menu-item';
import { MessageModel } from '../../models/message-model';

@Component({
    selector: 'app-save-button',
    templateUrl: './save-button.component.html',
    styleUrls: ['./save-button.component.scss']
})
export class SaveButtonComponent implements OnInit {

    @ViewChild('saveButton') saveButton!: ButtonComponent;

    @Input() alertMessageModel!: MessageModel;
    @Input() alertFailureMessage!: string;

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
            const data = await this.save();

            if (data === '') {
                this.alertService.raiseSuccess(MessageModel.fromMessageModel(this.alertMessageModel));
                this.saveButton.completeLoading();
            }
        }
    }
}