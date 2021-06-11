import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { MenuItem } from 'src/app/shared/components/nav-drawer/menu-item';
import { MenuService } from './../../shared/services/menu.service';
import { NavDrawerComponent } from '../../shared/components/nav-drawer/nav-drawer.component';
import { TabsComponent } from './../../shared/components/tabs/tabs.component';

@Component({
    selector: 'app-home-layout',
    templateUrl: './home-layout.component.html',
    host: { class: 'd-block h-100 mh-100' },
    styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit, AfterViewInit {

    @ViewChild('menu') menu!: NavDrawerComponent;
    @ViewChild('tabs') tabs!: TabsComponent;

    private userInfo = this.authenticationService.getInfo();


    constructor(
        private authenticationService: AuthenticationService,
        private menuService: MenuService,
        private sanitizer: DomSanitizer,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
    }

    async ngAfterViewInit(): Promise<void> {
        const menus = await this.menuService.getMenus()
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
        return this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + this.userInfo.photo)
    }

    navigateItem(menu: MenuItem) {
        if (menu.url) {
            this.tabs.openTab(menu.id, menu.label, menu.url);
        }
    }


    public toggleMenu() {
        this.menu.toggleState();
    }

    public signOut(): void {
        this.authenticationService.signOut();
    }
}