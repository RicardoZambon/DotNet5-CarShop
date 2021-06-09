import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';

import { MenuItem } from '../nav-drawer/menu-item';

@Component({
    selector: 'app-nav-item',
    templateUrl: './nav-item.component.html',
    styleUrls: ['./nav-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavItemComponent implements OnInit {
    
    @ViewChild('navItem') navItem!: ElementRef<HTMLLIElement>;

    @Input() parentCollapsed!: boolean;
    @Input() parentScrolling!: boolean;
    @Input() firstOpened!: boolean;
    @Input() level: number = 0;

    @Input() parentOffsetTop!: number;
    @Input() parentScroll: number = 0;
    @Input() parentOffsetHeight!: number;
    
    @Input() menu!: MenuItem;

    @Output() menuClick = new EventEmitter<MenuItem>();
    @Output() closeFloatMenu = new EventEmitter();
        
    constructor() { }

    ngOnInit(): void {
    }


    public click() {
        this.menuClick.emit(this.menu);
    }

    public subMenuClick(menu: MenuItem) {
        this.menuClick.emit(menu);
    }

    public subMenuCloseFloatMenu() {
        this.closeFloatMenu.emit();
    }

    
    public calculateHeight(menu: MenuItem): number {
        if (menu.children.length > 0 && menu.selected) {
            
            let height = menu.children.length * 45;
            menu.children.forEach(subMenu => {
                height += this.calculateHeight(subMenu);
            });

            const maxHeight = this.calculateMaxHeight() as number;

            return height < maxHeight || this.level > 0 || !this.parentCollapsed
                ? height
                : maxHeight ?? height;
        }
        return 0;
    }

    public calculateMarginTop() {
        if (this.parentCollapsed && (this.menu.floatMenuState === 'opening' || this.menu.floatMenuState === 'show' || this.menu.floatMenuState === 'closing')) {
            if (this.navItem.nativeElement.offsetTop - this.parentScroll <= this.parentOffsetTop) {
                //this.closeFloatMenu.emit();
                return this.parentOffsetTop - this.navItem.nativeElement.offsetTop - 45;
            }
            else if (this.navItem.nativeElement.offsetTop + this.calculateHeight(this.menu) - this.parentOffsetTop - this.parentScroll > this.parentOffsetHeight) {
                //this.closeFloatMenu.emit();
                return this.parentOffsetTop - this.navItem.nativeElement.offsetTop + this.parentOffsetHeight - this.calculateHeight(this.menu) - 45;
            }
            return (this.parentScroll + this.navItem.nativeElement.clientHeight) * -1;
        }
        return 0;
    }

    public calculateMaxHeight(): number | null {
        return this.parentCollapsed
            ? this.parentOffsetHeight
            : null;
    }
}