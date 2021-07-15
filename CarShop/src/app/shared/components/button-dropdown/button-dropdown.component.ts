import { Component, Input, OnInit } from '@angular/core';

import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { MenuItem } from './menu-item';

@Component({
    selector: 'app-button-dropdown',
    templateUrl: './button-dropdown.component.html',
    styleUrls: ['./button-dropdown.component.scss']
})
export class ButtonDropdownComponent extends ButtonComponent implements OnInit {

    @Input() menuItems: MenuItem[] = new Array<MenuItem>();

    constructor() {
        super();
    }

    ngOnInit(): void {
    }


    identify(index: number, item: MenuItem){
        return item.label; 
    }

    itemClick(menuItem: MenuItem, event: Event): void {
        if (this.setLoadingOnClick) {
           this.startLoading();
        }

        setTimeout(() => {
           this.buttonElement.nativeElement.blur();
        }, 200);

        if (menuItem.command) {
           menuItem.command(event);
        }
    }
}