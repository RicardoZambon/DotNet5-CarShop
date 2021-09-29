import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { IBaseView } from '../interfaces/i-base-view';
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


    
    isOpen(url: string): boolean {
        return this.openTabs.some(x => x.url === url);
    }

    getTab(url: string): Tab {
        return this.openTabs.filter(x => x.url === url)[0];
    }


    openUrl(url: string): void {
        let tab: Tab;

        if (!this.isOpen(url)) {
            tab = new Tab();
            tab.url = url;

            this.openTabs.push(tab);
            this.tabOpened.emit(url);
        }
        else {
            tab = this.getTab(url);
        }
            
        this.setTabActive(tab);
    }

    openView(view: IBaseView, url: string): void {
        let tab: Tab;

        if (!this.isOpen(url)) {
            tab = new Tab();
            tab.url = url;

            this.openTabs.push(tab);
            this.tabOpened.emit(url);
        }
        else {
            tab = this.getTab(url);
        }

        if (tab.view) {
            //tab.view.titleUpdated.unsubscribe();
        }

        tab.view = view;
        tab.view.titleUpdated.subscribe(x => tab?.updatePosition());
        
        setTimeout(() => {
            tab.view.currentUrl = tab.url;
        });

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


    isTabValid(url: string): boolean {
        const tab = this.getTab(url);
        if (tab && tab.view) {
            return tab.view.isValid();
        }
        return false;
    }

    isTabFormDisabled(url: string) : boolean {
        const tab = this.getTab(url);
        if (tab && tab.view) {
            return tab.view.formDisabled;
        }
        return false;
    }


    refreshTabModel(url: string, model?: any) {
        const tab = this.getTab(url);
        if (tab && tab.view) {
            tab.view.refreshModel(model);
        }
    }

    redirectTab(oldUrl: string, newUrl: string): void {
        const tab = this.getTab(oldUrl);
        if (tab) {
            tab.url = newUrl;
            tab.view.currentUrl = newUrl;
            this.tabRedirected.emit({oldUrl: oldUrl, newUrl: newUrl});
            this.router.navigate([newUrl]);
        }
    }

    showTabValidation(url: string): void {
        const tab = this.getTab(url);
        if (tab && tab.view) {
            return tab.view.showValidation();
        }
    }

    disableTabForm(url: string): void {
        const tab = this.getTab(url);
        if (tab && tab.view) {
            return tab.view.disableForm();
        }
    }

    async saveTab(url: string): Promise<any> {
        const tab = this.getTab(url);
        if (tab && tab.view) {
            return await tab.view.saveView();
        }
    }


    closeTab(tab: Tab): void {

        if (tab.view) {
            tab.view.titleUpdated.unsubscribe();
        }

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