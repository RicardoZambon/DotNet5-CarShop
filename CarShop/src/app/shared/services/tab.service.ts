import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Tab } from '../components/tabs/tab';

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


    public tabOpened = new EventEmitter<string>();
    public tabClosed = new EventEmitter<string>();

    constructor(private router: Router) { }


    public openTab(title: string, url: string, loadingTitle: boolean = false): void {
        let tab = this.getTab(url);
        if (!tab) {
            tab = new Tab();
            
            tab.title = title;
            tab.url = url;
            tab.loadingTitle = loadingTitle;
            this.openTabs.push(tab);

            this.tabOpened.emit(url);
        }
        this.setTabActive(tab);
    }

    public setTabActive(tab: Tab | null): void {
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

    public isTabOpen(url: string): boolean {
        return this.openTabs.filter(x => x.url === url).length > 0;
    }

    public getTab(url: string): Tab | undefined {
        if (this.isTabOpen(url)) {
            return this.openTabs.filter(x => x.url === url)[0];
        }
        return undefined;
    }

    public closeTab(tab: Tab): void {
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

    public closeAllTabs(): void {
        this.openTabs = new Array<Tab>();
        this._activeTab = null;
    }

    public openCurrentUrl(title: string) {
        const url = this.router.url.substring(1, this.router.url.length);

        const tab = this.getTab(url);
        if (tab) {
            tab.title = title;
            tab.loadingTitle = false;
        }
        else {
            this.openTab(title, url);
        }
    }
}