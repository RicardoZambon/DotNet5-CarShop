import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ButtonComponent } from '../../components/common/button/button.component';
import { IDetailsDatasource } from '../../interfaces/i-details-datasource';
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

    @Input() editDatasource!: IDetailsDatasource;

    @Input() alertMessageModel!: MessageModel;
    @Input() alertValidationMessage!: string;
    @Input() alertFailureMessage!: string;


    saveOptions: Array<MenuItem> = [
        new MenuItem('Button-Save', 'save', async () => { await this.click('save'); }),
        new MenuItem('Button-Save-And-Close', 'save', async () => { await this.click('close'); }),
        new MenuItem('Button-Save-And-New', 'save', async () => { await this.click('new'); }),
    ];
    

    constructor(private tabService: TabService) { }

    ngOnInit(): void {
    }


    async click(option: string): Promise<void> {
        if (this.editDatasource.dataForm.valid) {
            this.editDatasource.dataForm.disable();
            
                await this.editDatasource.save()
                .then(data => {
                    this.editDatasource.saveSuccess(data, this.alertMessageModel);
                    this.saveButton.completeLoading();
                    this.saveFinished(option, data);

                }, ex => {
                    this.editDatasource.saveFailure(ex, this.alertFailureMessage);
                    this.saveButton.cancelLoadingWithError();
                });
        } else {
            this.editDatasource.saveValidation(this.alertValidationMessage);
            this.saveButton.cancelLoadingWithWarning();
        }
    }

    saveFinished(option: string, object: any) {
        switch (option) {
            case 'close': 
                this.tabService.closeCurrentTab();
                break;
            case 'new':
                this.editDatasource.refresh(null);
                break;
            default:
                this.editDatasource.refresh(object);
                break;
        }
    }
}