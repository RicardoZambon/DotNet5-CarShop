import { MenuService } from './../../services/menu.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { AuthenticationService } from './../../services/authentication.service';
import { MenuItem } from './menu-item';


@Component({
  selector: 'app-nav-drawer',
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.scss']
})
export class NavDrawerComponent implements OnInit {

    firstOpened: boolean = true;
    collapsed: boolean = false;

    public userName: string = 'Test user';
    public userDepartment: string = 'Some department';
    public userImage!: SafeUrl;

    constructor(
        private authenticationService: AuthenticationService,
        private sanitizer: DomSanitizer,
        private router: Router,
        private menuService: MenuService
    ) { }

    ngOnInit(): void {
        const userInfo = this.authenticationService.getInfo();

        this.userName = userInfo.name;
        this.userDepartment = userInfo.department;
        this.userImage = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + userInfo.photo)
    }


    public toggleState() {
        this.collapsed = !this.collapsed;
        this.firstOpened = false;
    }

    public getMenus() {
        return this.menuService.menus;
    }

    public isActive(route: string): boolean {
        return this.router.isActive(route, false);
    }

}
