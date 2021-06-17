import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

import { CustomReuseStrategy } from '../../custom-reuse-strategy';
import { Tab } from './tab';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    host: { class: 'd-flex flex-column w-100 h-100' }
})
export class TabsComponent implements OnInit, OnDestroy {

    public activeTab: Tab | null = null;
    public openTabs: Array<Tab> = new Array<Tab>();

    subs = new Subscription();
        
    constructor(
        private routeReuse: RouteReuseStrategy,
        private router: Router,
        private dragulaService: DragulaService
    ) {
        this.dragulaService.createGroup("TABS", {
            direction: 'horizontal'
        });

        this.subs.add(
            this.dragulaService.dragend("TABS")
                .subscribe(() => {
                    this.activeTab?.updatePosition();
                })
        );
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }


    public openTab(title: string, url: string): void {
        let tab = this.openTabs.filter(tab => tab.url === url)[0];
        if (!tab) {
            tab = new Tab();
            
            tab.title = title;
            tab.url = url;
            this.openTabs.push(tab);

            (<CustomReuseStrategy>this.routeReuse).storeNewRoute(url);
        }
        this.setTabActive(tab);
    }

    public setTabActive(tab: Tab | null): void {
        if (this.activeTab) {
            this.activeTab = null;
        }
        
        if (tab) {
            this.activeTab = tab;
            this.activeTab.updatePosition();

            this.router.navigate([tab.url]);
        }
        else {
            this.router.navigate(['/']);
        }
    }

    public closeTab(tab: Tab): void {
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

            if (this.activeTab) {
                this.activeTab.updatePosition();
            }
        }
    }


    public getSelectedLeft(): number {
        return this.activeTab?.x ?? 0;
    }

    public getSelectedWidth(): number {
        return this.activeTab?.width ?? 0;
    }
}