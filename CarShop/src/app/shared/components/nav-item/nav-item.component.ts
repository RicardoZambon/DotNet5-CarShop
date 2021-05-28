import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from '../nav-drawer/menu-item';
import { MenuService } from './../../services/menu.service';

@Component({
    selector: 'app-nav-item',
    templateUrl: './nav-item.component.html',
    styleUrls: ['./nav-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavItemComponent implements OnInit {

    @Input() menu!: MenuItem;
    @Input() level: number = 0;
        
    constructor(private menuService: MenuService, private router: Router) { }

    ngOnInit(): void {
    }


    public menuClick() {
        this.menuService.selectNode(this.menu);

        if (this.menu.url) {
            this.router.navigate([this.menu.url]);
        }
    }
}