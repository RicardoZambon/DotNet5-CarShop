import { Component, OnInit } from '@angular/core';

import { Tab } from './tab';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

    public activeTab: Tab | null = null;
    public openTabs: Array<Tab> = new Array<Tab>();
        
    constructor() { }

    ngOnInit(): void {
    }


    public openTab(menuId: number, title: string) {
        let tab = this.openTabs.filter(tab => tab.menuId === menuId)[0];
        if (!tab) {
            tab = new Tab();
            tab.menuId = menuId;
            tab.title = title;
            this.openTabs.push(tab);
        }
        this.setTabActive(tab);
    }

    public setTabActive(tab: Tab) {
        this.activeTab = tab;
    }

    public closeTab(tab: Tab) {
        const index = this.openTabs.indexOf(tab);
        if (index > -1) {
            this.openTabs.splice(index, 1);

            if (this.openTabs.length <= 0) {
                this.activeTab = null;
            }
            else if (index >= this.openTabs.length) {
                this.activeTab = this.openTabs[this.openTabs.length - 1];
            }
            else {
                this.activeTab = this.openTabs[index];
            }
        }
    }
}