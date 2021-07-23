import { EventEmitter } from '@angular/core';

export class Tab {
    title!: string;
    url!: string;
    
    x!: number;
    width!: number;

    loadingTitle: boolean = false;

    updatedPosition = new EventEmitter();

    updatePosition() {
        setTimeout(() => {
            this.updatedPosition.emit();
        }, 10);
    }
}
