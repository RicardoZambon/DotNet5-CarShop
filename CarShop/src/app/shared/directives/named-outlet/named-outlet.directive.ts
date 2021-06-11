import { Directive, OnInit, OnDestroy, Input, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef } from "@angular/core";
import { RouterOutlet, ChildrenOutletContexts } from "@angular/router";

@Directive({
    selector: 'named-outlet',
    exportAs: 'outlet'
})
export class NamedOutletDirective implements OnInit, OnDestroy {
    
    public outlet!: RouterOutlet;
    
    @Input() public name!: string;

    constructor(
        private parentContexts: ChildrenOutletContexts,
        private location: ViewContainerRef,
        private resolver: ComponentFactoryResolver, 
        private changeDetector: ChangeDetectorRef,
    ) {}

    ngOnInit() {
        this.outlet = new RouterOutlet(this.parentContexts, this.location, this.resolver, this.name, this.changeDetector);
        this.outlet.ngOnInit();
    }
    
    ngOnDestroy() {
        if (this.outlet) {
            this.outlet.ngOnDestroy();
        }
    }
  }