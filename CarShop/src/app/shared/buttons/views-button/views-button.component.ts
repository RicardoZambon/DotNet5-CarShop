import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { MenuItem } from '../../components/common/button-dropdown/menu-item';
import { ButtonComponent } from '../../components/common/button/button.component';

@Component({
  selector: 'app-views-button',
  templateUrl: './views-button.component.html',
  styleUrls: ['./views-button.component.scss']
})
export class ViewsButtonComponent implements OnInit {

    @ViewChild('viewsButton') viewsButton!: ButtonComponent;
    
    @Input() options!: Array<{ name: string, label: string, icon: string}>;

    viewsOptions = new Array<MenuItem>();


    constructor() { }

    ngOnInit(): void {
        this.options.forEach(option => {
            this.viewsOptions.push({
                label: option.label,
                icon: option.icon,
                command: async () => { await this.click(option.name); }
            })
        })
    }


    async click(option: string): Promise<void> {

    }
}