import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Directive, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[auto-scroll]'
})
export class AutoScrollDirective implements OnInit, AfterViewInit {

    private url: string = '';
    private scrollPos: number = 0;
        
    constructor(private el: ElementRef<HTMLElement>, private router: Router) {
    }
    
    ngOnInit(): void {
        this.router.events
            .pipe(
                filter((event) =>
                    event instanceof NavigationStart ||
                    event instanceof NavigationEnd ||
                    event instanceof NavigationCancel ||
                    event instanceof NavigationError
                )
            )
            .subscribe((event) => {                
                if (this.router.url === this.url) {
                    if (event instanceof NavigationStart) {
                        this.scrollPos = this.el.nativeElement.scrollTop;
                        return;
                    }
                    this.el.nativeElement.scrollTop = this.scrollPos;
                }
            });
    }

    ngAfterViewInit(): void {
        this.url = this.router.url;
    }

    
}
