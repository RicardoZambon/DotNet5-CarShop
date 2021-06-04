import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { MenuService } from './../../shared/services/menu.service';
import { NavDrawerComponent } from '../../shared/components/nav-drawer/nav-drawer.component';

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
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit(): void {
    }

    async ngAfterViewInit(): Promise<void> {
        this.menu.menus = await this.menuService.getMenus();
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


    public toggleMenu() {
        this.menu.toggleState();
    }

    public signOut(): void {
        this.authenticationService.signOut();
    }
}