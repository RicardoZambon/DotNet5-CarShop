import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { MenuItem } from './menu-item';


@Component({
    selector: 'app-nav-drawer',
    templateUrl: './nav-drawer.component.html',
    styleUrls: ['./nav-drawer.component.scss']
})
export class NavDrawerComponent implements OnInit {

    @Input() menus: MenuItem[] | null = null;

    public firstOpened: boolean = true;
    public collapsed: boolean = false;
    public currentScroll: number = 0;

    public scrolling: boolean = false;
    private scrollingTimer: NodeJS.Timeout | null = null;

    @Input() userName!: string;
    @Input() userDepartment!: string;
    @Input() userImage!: SafeUrl;

    @ViewChild('navMenu') navMenu!: ElementRef<HTMLUListElement>;

    @Output() navigated = new EventEmitter<MenuItem>();

    private activeRootNode: MenuItem | null = null;

    constructor() { }

    ngOnInit(): void { 
    }


    public async toggleState() {
        if (this.activeRootNode?.floatMenuState === 'show') {
            await this.clearSelection(this.activeRootNode);
            this.activeRootNode = null;
        }

        this.collapsed = !this.collapsed;
        this.firstOpened = false;
    }


    async menuClick(menu: MenuItem) {
        await this.selectMenu(menu);

        if (menu.url) {
            this.navigated.emit(menu);

            if (this.collapsed) {
                this.closeFloatMenu();
            }
            else if (this.activeRootNode) {
                this.clearSelection(this.activeRootNode);
            }
        }
    }

    private async clearSelection(menu: MenuItem): Promise<void> {
        if (!(menu.parent) && menu.floatMenuState == 'show') {
            menu.floatMenuState = 'closing';

            await of(menu)
                .pipe(
                    delay(400),
                    map(menu => {
                        menu.floatMenuState = 'hide';
                        return menu;
                    }),
                    delay(100),
                    map(menu => {
                        menu.floatMenuState = '';
                        return;
                    })
                ).toPromise();
        }

        menu.selected = false;
        menu = menu.children.filter(el => el.selected)[0];
        if (menu) {
            this.clearSelection(menu);
        }
        return;
    }

    private async selectMenu(menu: MenuItem): Promise<void> {
        const rootNode = menu.getRootNode();

        if (this.collapsed && menu.parent === null) {
            if (this.activeRootNode?.floatMenuState === 'show') {
                this.clearSelection(this.activeRootNode);

                if (this.activeRootNode === menu) {
                    this.activeRootNode = null;
                    return;
                }
            }
            else if (this.activeRootNode && this.activeRootNode !== menu) {
                this.clearSelection(this.activeRootNode);
            }

            if (menu.children.length > 0) {
                this.activeRootNode = menu;
                this.activeRootNode.floatMenuState = 'opening';
                this.activeRootNode.selected = true;
                
                return of(this.activeRootNode)
                    .pipe(
                        delay(400),
                        map(menu => {
                            menu.floatMenuState = 'show';
                        })
                    ).toPromise();
            }
        }
        else {
            if (this.activeRootNode) {
                if (this.activeRootNode !== rootNode) {
                    await this.clearSelection(this.activeRootNode);
                }
                else {
                    let activeNode: MenuItem | null = this.activeRootNode;
                    let menuNode = rootNode;

                    while (activeNode) {
                        if (activeNode === menu) {
                            this.clearSelection(activeNode);

                            if (activeNode === this.activeRootNode) {
                                this.activeRootNode = null;
                            }
                            return;
                        }
                        else if (activeNode !== menuNode) {
                            this.clearSelection(activeNode);
                            break;
                        }
                        
                        activeNode = activeNode.children.filter(el => el.selected)[0];

                        menuNode = menuNode.children.filter(el => el.id == menu.id)[0]
                                    ?? menuNode.children.filter(el => el.selected)[0];
                    }
                }
            }
        }
        
        this.activeRootNode = rootNode;
        menu.selected = true;
    }


    public async closeFloatMenu() {
        if (this.activeRootNode && this.activeRootNode.floatMenuState === 'show') {
            await this.clearSelection(this.activeRootNode);
        }
    }


    public getOffsetHeight(): number {
        return this.navMenu.nativeElement.offsetHeight;
    }

    public getOffsetTop(): number {
        return this.navMenu.nativeElement.offsetTop;
    }

    public updateScroll(event: number) {
        this.currentScroll = event;
        this.scrolling = true;

        if(this.scrollingTimer) {
            clearTimeout(this.scrollingTimer);
        }

        this.scrollingTimer = setTimeout(() => {
            this.scrolling = false;
            this.scrollingTimer = null;
        }, 100);
    }
}