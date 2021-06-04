import { Directive, EventEmitter, Output } from '@angular/core';

@Directive({
    selector: '[track-scroll]',
    host: {'(scroll)': 'track($event)'}
})
export class TrackScrollDirective {

    @Output() scrolled = new EventEmitter<number>();

    constructor() { }

    track($event: Event) {
        this.scrolled.emit(($event.target as HTMLElement).scrollTop);
    }
}
