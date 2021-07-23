import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { SelectionChangedEvent } from 'ag-grid-community';

import { ButtonComponent } from '../../components/button/button.component';
import { TabService } from './../../services/tab.service';


@Component({
    selector: 'app-edit-button',
    templateUrl: './edit-button.component.html',
    styleUrls: ['./edit-button.component.scss']
})
export class EditButtonComponent implements OnInit {

    @ViewChild('editButton') editButton!: ButtonComponent;
    
    @Input() grid!: AgGridAngular;
    @Input() editUrl!: string;
    @Input() massDelete: boolean = true;

    disabled = true;
    private selectedId?: string;

    constructor(private tabService: TabService) { }

    ngOnInit(): void {
        this.grid.selectionChanged.subscribe((event: SelectionChangedEvent) => {
            const selectedNodes = event.api.getSelectedNodes();
            this.disabled = (selectedNodes.length !== 1 && this.massDelete) || (selectedNodes.length === 1 && !this.massDelete);
            this.selectedId = (!this.disabled) ? selectedNodes[0].id : undefined;
        });
    }


    async click(): Promise<void> {
        if (this.selectedId) {
            this.tabService.openTab('', this.editUrl.replace('{id}', this.selectedId), true);
        }
        this.editButton.completeLoading();
    }
}