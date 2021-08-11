import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { Dropdown } from 'bootstrap';

import { ButtonComponent } from '../button/button.component';
import { MenuItem } from './menu-item';

@Component({
    selector: 'app-button-dropdown',
    templateUrl: './button-dropdown.component.html',
    styleUrls: ['./button-dropdown.component.scss']
})
export class ButtonDropdownComponent extends ButtonComponent implements OnInit, AfterViewInit {

    hover: boolean = false;

    @ViewChild('dropdown') dropdownElement!: ElementRef<HTMLDivElement>;
    @ViewChild('toggle') toggle!: ElementRef<HTMLDivElement>;
    private dropdown?: Dropdown | null = null;

    @Input() position: 'left' | 'right' = 'left';
    @Input() defaultAction: MenuItem | null = null;
    @Input() menuItems: MenuItem[] = new Array<MenuItem>();

    constructor() {
        super();
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.dropdown = new Dropdown(this.toggle.nativeElement);

        const _this = this;
        const button = this.buttonElement;

        this.toggle.nativeElement.addEventListener('show.bs.dropdown', function(event: Event) {
            (_this.dropdown as any)._config.offset[0] = _this.position === 'left' ? button.nativeElement.clientWidth * -1 : 0;
        });
    }
    
    
    @HostListener('mouseenter')
    mouseEnter() {
        if (!this.defaultAction) {
            this.hover = true;
        }
    }

    @HostListener('mouseleave')
    mouseLeave() {
        if (!this.defaultAction) {
            this.hover = false;
        }
    }
    

    getMenuItems() {
        return this.menuItems.filter(x => x !== this.defaultAction);
    }

    identify(index: number, item: MenuItem){
        return item.label; 
    }

    
    @HostListener('window:click', ['$event'])
    hostClick(event: MouseEvent) {
        if (this.toggle.nativeElement.classList.contains('show')) {
            let target = event.target as HTMLElement;
            while (target != null && target.tagName !== 'BODY') {
                if (target === this.buttonElement.nativeElement || target === this.toggle.nativeElement) {
                    return;
                }
                target = target.parentElement as HTMLElement;
            }
            this.dropdown?.hide();
        }
    }

    buttonClick(event: MouseEvent) {
        if (this.defaultAction) {
           this.itemClick(this.defaultAction, event);
        }
        else {
            this.dropdown?.toggle();
        }
    }

    dropdownToggle() {
        this.dropdown?.toggle();
    }


    itemClick(menuItem: MenuItem, event: Event): void {
        if (this.toggle.nativeElement.classList.contains('show')) {
            this.dropdown?.hide();
        }

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