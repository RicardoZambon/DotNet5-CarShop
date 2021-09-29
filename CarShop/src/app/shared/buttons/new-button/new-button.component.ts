import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ButtonComponent } from '../../components/common/button/button.component';
import { TabService } from '../../services/tab.service';

@Component({
  selector: 'app-new-button',
  templateUrl: './new-button.component.html',
  styleUrls: ['./new-button.component.scss']
})
export class NewButtonComponent implements OnInit {

    @ViewChild('newButton') newButton!: ButtonComponent;
    
    @Input() newUrl!: string;


    constructor(private tabService: TabService) { }

    ngOnInit(): void {
    }


    async click(): Promise<void> {
        this.tabService.openUrl(this.newUrl);
        this.newButton.completeLoading();
    }
}