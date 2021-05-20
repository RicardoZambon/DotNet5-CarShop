import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
    selector: "[autofocus]"
})
export class AutofocusDirective {

    private focus = true;

    @Input() set autofocus(condition: boolean) {
        this.focus = condition !== false;
    }

    constructor(private el: ElementRef) {

    }

    ngOnInit() {
        if (this.focus) {
            window.setTimeout(() => {
                this.el.nativeElement.focus();
            });
        }
    }
}