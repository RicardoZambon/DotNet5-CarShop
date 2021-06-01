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
    
    @Input() parentCollapsed!: boolean;
    @Input() firstOpened!: boolean;
    @Input() level: number = 0;
    
    @Input() menu!: MenuItem;
        
    constructor(private menuService: MenuService, private router: Router) { }

    ngOnInit(): void {
    }


    public menuClick() {
        if (this.parentCollapsed) {
            this.menuService.showFloatMenu(this.menu);
        }
        else {
            this.menuService.selectNode(this.menu);
        }

        if (this.menu.url) {
            this.router.navigate([this.menu.url]);
        }
    }

    public calculateHeight(menu: MenuItem): number {
        if (menu.children.length > 0 && menu.selected) {
            let height = menu.children.length * 45;
            menu.children.forEach(subMenu => {
                height += this.calculateHeight(subMenu);
            });
            return height;
        }
        return 0;
    }
}