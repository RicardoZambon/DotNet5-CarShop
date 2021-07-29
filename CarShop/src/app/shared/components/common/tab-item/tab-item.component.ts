import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Tab } from '../tabs/tab';

@Component({
  selector: 'app-tab-item',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss']
})
export class TabItemComponent implements OnInit, OnDestroy {

    @Input() tab!: Tab;
    @Input() isActive!: boolean;

    @ViewChild('tabItem') tabItem!: ElementRef;

    @Output() navigated = new EventEmitter<Tab>();
    @Output() closed = new EventEmitter<Tab>();

    subs = new Subscription();


    constructor() { }

    ngOnInit(): void {
        this.tab.updatedPosition.subscribe(() => {
            this.tab.width = this.tabItem.nativeElement.clientWidth;
            this.tab.x = this.tabItem.nativeElement.offsetLeft + 1;
        });
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }


    itemClick(): void {
        this.navigated.emit(this.tab);
    }

    closeClick(): void {
        this.closed.emit(this.tab);
    }
}