import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { AlertMessage } from './alert-message';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {
    
    @Input() alertMessage!: AlertMessage;

    constructor() { }

    ngOnInit(): void {
    }
}