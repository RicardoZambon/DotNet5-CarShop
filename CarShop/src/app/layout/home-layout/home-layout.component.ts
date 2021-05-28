import { Component, OnInit, ViewChild } from '@angular/core';

import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { NavDrawerComponent } from '../../shared/components/nav-drawer/nav-drawer.component';

@Component({
    selector: 'app-home-layout',
    templateUrl: './home-layout.component.html',
    host: { class: 'd-block h-100 mh-100' },
    styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

    @ViewChild('menu') menu!: NavDrawerComponent;

    constructor(private authenticationService: AuthenticationService) { }

    ngOnInit(): void {
    }


    public toggleMenu() {
        this.menu.toggleState();
    }

    public signOut(): void {
        this.authenticationService.signOut();
    }
}