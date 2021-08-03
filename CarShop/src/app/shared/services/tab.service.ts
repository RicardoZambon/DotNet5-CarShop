import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Tab } from '../components/common/tabs/tab';

@Injectable({
    providedIn: 'root'
})
export class TabService {

    private _activeTab: Tab | null = null;
    private _openTabs = new Array<Tab>();

    public get openTabs(): Array<Tab> {
        return this._openTabs;
    }
    public set openTabs(value: Array<Tab>) {
        this._openTabs = value;
    }

    public get activeTab(): Tab | null {
        return this._activeTab;
    }

    public get hasChangedTab(): boolean {
        return this._openTabs.filter(x => x.changedValues).length > 0;
    }


    public tabOpened = new EventEmitter<string>();
    public tabRedirected = new EventEmitter<{ oldUrl: string, newUrl: string }>();
    public tabClosed = new EventEmitter<string>();

    constructor(private router: Router) { }


    
    isTabOpen(url: string): boolean {
        return this.openTabs.filter(x => x.url === url).length > 0;
    }

    getTab(url: string): Tab | undefined {
        if (this.isTabOpen(url)) {
            return this.openTabs.filter(x => x.url === url)[0];
        }
        return undefined;
    }


    openTab(title: string, url: string, loadingTitle: boolean = false): void {
        let tab = this.getTab(url);
        if (!tab) {
            tab = new Tab();
            tab.url = url;

            this.openTabs.push(tab);
            this.tabOpened.emit(url);
        }
        
        tab.title = title;
        tab.loadingTitle = loadingTitle;
            
        this.setTabActive(tab);
    }

    setTabActive(tab: Tab | null): void {
        if (this.activeTab) {
            this._activeTab = null;
        }
        
        if (tab) {
            this._activeTab = tab;
            this._activeTab.updatePosition();

            this.router.navigate([tab.url]);
        }
        else {
            this.router.navigate(['/']);
        }
    }


    closeTab(tab: Tab): void {
        const index = this.openTabs.indexOf(tab);
        if (index > -1) {
            this.openTabs.splice(index, 1);
            this.tabClosed.emit(tab.url);

            if (this.openTabs.length <= 0) {
                this.setTabActive(null);
            }
            else if (tab === this.activeTab) {
                if (index >= this.openTabs.length) {
                    this.setTabActive(this.openTabs[this.openTabs.length - 1]);
                }
                else {
                    this.setTabActive(this.openTabs[index]);
                }
            }
            
            if (this.activeTab) {
                this.activeTab.updatePosition();
            }
        }
    }

    closeAllTabs(): void {
        this.openTabs = new Array<Tab>();
        this._activeTab = null;
    }

    closeCurrentTab(): void {
        const url = this.router.url.substring(1, this.router.url.length);
        const tab = this.getTab(url);
        if (tab) {
            this.closeTab(tab);
        }
    }


    redirectCurrentTab(url: string): void {
        const oldUrl = this.router.url.substring(1, this.router.url.length);
        const tab = this.getTab(oldUrl);
        if (tab) {
            tab.url = url;
            console.log({oldUrl: oldUrl, newUrl: url});
            this.tabRedirected.emit({oldUrl: oldUrl, newUrl: url});
            this.router.navigate([url]);

            console.log('router navigated', url);
        }
    }


    setChangedValues(url: string): void {
        const tab = this.getTab(url);
        if (tab && !tab.changedValues) {
            tab.changedValues = true;
            tab.updatePosition();
        }
    }

    clearChangedValues(url: string): void {
        const tab = this.getTab(url);
        if (tab && tab.changedValues) {
            tab.changedValues = false;
            tab.updatePosition();
        }
    }
}