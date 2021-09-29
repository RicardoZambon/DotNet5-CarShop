import { IBaseView } from '../../../interfaces/i-base-view';
import { EventEmitter } from '@angular/core';

export class Tab {
    view!: IBaseView;
    url!: string;
    
    x!: number;
    width!: number;

    changedValues = false;

    updatedPosition = new EventEmitter();

    updatePosition() {
        setTimeout(() => {
            this.updatedPosition.emit();
        }, 10);
    }
}
