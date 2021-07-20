import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { MenuItem } from 'src/app/shared/components/nav-drawer/menu-item';
import { MenuService } from './../../shared/services/menu.service';
import { NavDrawerComponent } from '../../shared/components/nav-drawer/nav-drawer.component';
import { TabService } from './../../shared/services/tab.service';

@Component({
    selector: 'app-home-layout',
    templateUrl: './home-layout.component.html',
    host: { class: 'd-block h-100 mh-100' },
    styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit, AfterViewInit {

    @ViewChild('menu') menu!: NavDrawerComponent;

    private userInfo = this.authenticationService.getInfo();


    constructor(
        private authenticationService: AuthenticationService,
        private menuService: MenuService,
        private tabService: TabService,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit(): void {
    }

    async ngAfterViewInit(): Promise<void> {
        const menus = await this.menuService.getMenus();
        if (typeof menus === 'string') {
            console.log(menus);
        }
        else {
            this.menu.menus = menus;
        }
    }

    
    getUserName(): string {
        return this.userInfo.name;
    }
    getUserDepartment(): string{
        return this.userInfo.department;
    }
    getUserImage(): SafeUrl {
        return this.userInfo.photo
            ? this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + this.userInfo.photo)
            : '/assets/user-default.png';
    }

    navigateItem(menu: MenuItem): void {
        if (menu.url) {
            this.tabService.openTab(menu.label, menu.url);
        }
    }


    public toggleMenu(): void {
        this.menu.toggleState();
    }

    public signOut(): void {
        this.tabService.closeAllTabs();
        this.authenticationService.signOut();
    }
}