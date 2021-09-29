import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ButtonComponent } from '../../components/common/button/button.component';
import { IDetailsView } from '../../interfaces/i-details-view';
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

    @Input() tabCurrentUrl!: string;

    saveOptions: Array<MenuItem> = [
        new MenuItem('save', 'Button-Save', 'save', async () => { await this.click('save'); }),
        new MenuItem('close', 'Button-Save-And-Close', 'save', async () => { await this.click('close'); }),
        new MenuItem('new', 'Button-Save-And-New', 'save', async () => { await this.click('new'); }),
    ];
    

    constructor(public tabService: TabService) { }

    ngOnInit(): void {
    }


    async click(option: string): Promise<void> {
        if (this.tabService.isTabValid(this.tabCurrentUrl)) {
            this.tabService.disableTabForm(this.tabCurrentUrl);

            await this.tabService.saveTab(this.tabCurrentUrl)
                .then(data => {
                    this.saveButton.completeLoading();
                    this.saveFinished(option, data);
                }, ex => {
                    this.saveButton.cancelLoadingWithError();
                });
        } else {
            this.tabService.showTabValidation(this.tabCurrentUrl);
            this.saveButton.cancelLoadingWithWarning();
        }
    }

    saveFinished(option: string, object: any) {
        switch (option) {
            case 'close': 
                this.tabService.closeCurrentTab();
                break;
            case 'new':
                this.tabService.clearChangedValues(this.tabCurrentUrl);
                this.tabService.refreshTabModel(this.tabCurrentUrl, null);
                break;
            default:
                this.tabService.clearChangedValues(this.tabCurrentUrl);
                this.tabService.refreshTabModel(this.tabCurrentUrl, object);
                break;
        }
    }
}