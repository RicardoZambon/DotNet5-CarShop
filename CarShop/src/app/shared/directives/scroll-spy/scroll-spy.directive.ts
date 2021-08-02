import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: '[appScrollSpy]'
})
export class ScrollSpyDirective {
    
    private childElements = new Array<Element>();
    private currentSection: number | null = null;

    
    @Input() public spiedTags: Array<string> = [];

    @Output() public sectionChange = new EventEmitter<number | null>();
    

    constructor(private _el: ElementRef<HTMLElement>) {}


    ngAfterViewInit() {
        this.getChildElements(Array.from(this._el.nativeElement.children));
    }

    getChildElements(children: Element[]) {
        children.forEach(el => {
            if (this.spiedTags.some(spiedTag => spiedTag.toUpperCase() === el.tagName.toUpperCase())) {
                this.childElements.push(el);
            }
            else {
                this.getChildElements(Array.from(el.children));
            }
        })
    }

    @HostListener('scroll', ['$event'])
    onScroll(event: any): void {
        
        const scrollTop = event.target.scrollTop;
        const scrollHeight = event.target.scrollHeight;
        const maxScroll = Math.round(event.target.scrollHeight - event.target.getBoundingClientRect().height);

        const currentScroll = Math.round(scrollTop * scrollHeight / maxScroll);

        if (currentScroll >= scrollHeight) {
            this.select(this.childElements.length - 1);
            return;
        }

        const elements = this.childElements.filter(el => ((el as HTMLElement).offsetTop) <= currentScroll);

        this.select(elements.length > 0 ? elements.length -1 : null);
    }

    scrollTo(section: number): void {
        this._el.nativeElement.scrollTop = (this.childElements[section] as HTMLElement).offsetTop;
    }

    select(section: number | null): void {
        if (section !== this.currentSection) {
            this.currentSection = section;
            this.sectionChange.emit(section);
        }
    }
}