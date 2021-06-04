import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { MenuItem } from '../nav-drawer/menu-item';

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
    @Input() parentScroll!: number;
    
    @Input() menu!: MenuItem;

    @Output() menuClick = new EventEmitter<MenuItem>();
        
    constructor() { }

    ngOnInit(): void {
    }


    public click() {
        this.menuClick.emit(this.menu);
    }

    public subMenuClick(menu: MenuItem) {
        this.menuClick.emit(menu);
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

    public calculateMarginTop() {
        return this.parentCollapsed && (this.menu.floatMenuState === 'opening' || this.menu.floatMenuState === 'show' || this.menu.floatMenuState === 'closing')
            ? (45 + this.parentScroll) * -1
            : 0;
    }
}