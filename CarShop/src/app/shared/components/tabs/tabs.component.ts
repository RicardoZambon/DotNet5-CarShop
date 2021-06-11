import { Component, OnInit } from '@angular/core';
import { Router, RouteReuseStrategy, ActivatedRoute } from '@angular/router';
import { CustomReuseStrategy } from '../../custom-reuse-strategy';

import { Tab } from './tab';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

    public activeTab: Tab | null = null;
    public openTabs: Array<Tab> = new Array<Tab>();
        
    constructor(private routeReuse: RouteReuseStrategy, private router: Router) { }

    ngOnInit(): void {
    }


    public openTab(menuId: number, title: string, url: string) {
        let tab = this.openTabs.filter(tab => tab.menuId === menuId)[0];
        if (!tab) {
            tab = new Tab();
            
            tab.menuId = menuId;
            tab.title = title;
            tab.url = url;
            
            this.openTabs.push(tab);
            (<CustomReuseStrategy>this.routeReuse).storeNewRoute(url);
        }
        this.setTabActive(tab);
    }

    public setTabActive(tab: Tab | null) {
        this.activeTab = tab;
        if (tab?.url) {
            this.router.navigate([tab.url]);
        }
        else {
            this.router.navigate(['/']);
        }
    }

    public closeTab(tab: Tab) {
        const index = this.openTabs.indexOf(tab);
        if (index > -1) {
            this.openTabs.splice(index, 1);
            (<CustomReuseStrategy>this.routeReuse).removeRoute(tab.url);

            if (this.openTabs.length <= 0) {
                this.setTabActive(null);
            }
            else if (index >= this.openTabs.length) {
                this.setTabActive(this.openTabs[this.openTabs.length - 1]);
            }
            else {
                this.setTabActive(this.openTabs[index]);
            }
        }
    }
}