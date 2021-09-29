import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ButtonComponent } from '../../components/common/button/button.component';
import { IListDatasource } from '../../interfaces/i-list-datasource';
import { TabService } from './../../services/tab.service';

@Component({
    selector: 'app-edit-button',
    templateUrl: './edit-button.component.html',
    styleUrls: ['./edit-button.component.scss']
})
export class EditButtonComponent implements OnInit {

    @ViewChild('editButton') editButton!: ButtonComponent;
    
    @Input() datasource!: IListDatasource;
    @Input() editUrl!: string;
    @Input() massDelete: boolean = true;

    disabled = true;
    private selectedId?: string;

    constructor(private tabService: TabService) { }

    ngOnInit(): void {
        this.datasource.selectionChanged.subscribe(event => {
            const selectedNodes = event.api.getSelectedNodes();
            this.disabled = (selectedNodes.length !== 1 && this.massDelete) || (selectedNodes.length === 1 && !this.massDelete);
            this.selectedId = (!this.disabled) ? selectedNodes[0].id : undefined;
        });
    }


    async click(): Promise<void> {
        if (this.selectedId) {
            const tabUrl = this.editUrl.replace('{id}', this.selectedId);
            this.tabService.openUrl(tabUrl);
        }
        this.editButton.completeLoading();
    }
}