import { Directive, HostListener } from '@angular/core';

import { TabService } from '../../services/tab.service';

@Directive({
  selector: '[appCloseConfirm]'
})
export class CloseConfirmDirective {

    constructor(private tabsService: TabService) { }
    
    @HostListener('window:beforeunload', ['$event'])
    confirmOnClosing(event: Event) {
        event.preventDefault();
        if (this.tabsService.hasChangedTab) {
            return false;
        }
        return true;
    }
}