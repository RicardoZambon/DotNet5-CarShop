import { Directive } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[auto-scroll-grid]'
})
export class AutoScrollGridDirective {
    private url: string = '';
    private scrollPos: number | null = null;

    private cellSelected: number | null = null;
        
    constructor(private grid: AgGridAngular, private router: Router) {
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

                        const selectedNodes = this.grid.api.getSelectedNodes();
                        if (selectedNodes && selectedNodes.length > 0) {
                            this.cellSelected = selectedNodes[0].rowIndex;
                        }

                        return;
                    }
                    
                    if (this.cellSelected) {
                        this.grid.api.selectIndex(this.cellSelected, false, false);
                    }

                    if (this.scrollPos) {
                        const api: any = this.grid.api;
                        if (api.gridBodyComp && api.gridBodyComp.eBodyViewport) {
                            api.gridBodyComp.eBodyViewport.scrollTop = this.scrollPos;
                        }
                    }
                }
            });
    }

    ngAfterViewInit(): void {
        this.url = this.router.url;  
        
        this.grid.bodyScroll.subscribe(event => {
            this.scrollPos = event.top;
        });
    }
}