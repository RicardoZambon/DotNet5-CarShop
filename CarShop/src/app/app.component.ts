import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    loading: boolean = true;

    constructor (private router: Router) {
        router.events
            .subscribe(event => {
                this.navigationInterceptor(event);
            });
    }

    navigationInterceptor(event: Event): void {
        if (event instanceof NavigationStart) {
            this.loading = true;
        }
        else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
            this.loading = false;
        }
    }
}