import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
    selector: 'app-home-layout',
    templateUrl: './home-layout.component.html',
    styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

    constructor(private authenticationService: AuthenticationService) { }

    ngOnInit(): void {
    }


    signOut(): void {
        this.authenticationService.signOut();
    }
}