import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';

import { MenuItem } from '../components/nav-drawer/menu-item';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    menus!: MenuItem[];

    activeRootNode: MenuItem | null = null;

    constructor() {
        this.loadMenu();
    }


    loadMenu() {
        const data = [
            { id: 1, parentId: null, label: 'Dashboards', icon: 'th-large', url: 'home' },
            { id: 2, parentId: null, label: 'Security', icon: 'shield-alt' },
                { id: 3, parentId: 2, label: 'Users', icon: 'user', url: 'users' },
                { id: 4, parentId: 2, label: 'Roles', icon: 'user', url: 'users' },
                { id: 5, parentId: 2, label: 'Pages', icon: 'user', url: 'users' },
                    { id: 6, parentId: 5, label: 'Access', icon: 'user', url: 'users' },
                { id: 7, parentId: 2, label: 'Something', icon: 'user', url: 'users' },
            { id: 8, parentId: null, label: 'Test', icon: 'user', url: 'users' },
        ];

        let mapMenu = function(parent: MenuItem | null) {
            return data
                .filter(el => el.parentId === ((parent) ? parent.id : null))
                .map(item => {
                    let menuItem = new MenuItem();
                    
                    menuItem.parent = parent;
                    menuItem.id = item.id;

                    menuItem.label = item.label;
                    menuItem.icon = item.icon;
                    menuItem.url = item.url;

                    menuItem.children = mapMenu(menuItem);

                    return menuItem;
                });
        };

        this.menus = mapMenu(null);
    }


    clearSelection(node: MenuItem): void {
        node.selected = false;
        node = node.children.filter(el => el.selected)[0];
        if (node) {
            this.clearSelection(node);
        }
    }

    selectNode(menu: MenuItem): void {
        const rootNode = menu.getRootNode();

        if (this.activeRootNode) {
            let activeNode: MenuItem | null = this.activeRootNode;
            let menuNode = rootNode;

            if (activeNode !== menuNode) {
                this.clearSelection(activeNode);
            }
            else {
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
        
        this.activeRootNode = rootNode;
        menu.selected = true;
    }

    showFloatMenu(menu: MenuItem): void {
        const rootNode = menu.getRootNode();

        if (menu === rootNode && menu.children.length > 0) {
            if (this.activeRootNode?.showFloatMenu) {
                
                this.activeRootNode.showFloatMenu = false;

                if (this.activeRootNode === rootNode) {
                    this.clearSelection(this.activeRootNode);
                    this.activeRootNode = null;
                    return;
                }
            }

            this.activeRootNode = rootNode;
            this.activeRootNode.showFloatMenu = true;
            this.activeRootNode.selected = true;
        }
        else {
            this.selectNode(menu);
        }
    }
}
