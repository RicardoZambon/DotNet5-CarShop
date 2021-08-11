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
    
    @Input() viewsOptions!: Array<MenuItem>;

    
    constructor() { }

    ngOnInit(): void {
    }
}