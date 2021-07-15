import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
  host: { class: 'd-flex flex-column flex-nowrap' }
})
export class ButtonGroupComponent implements OnInit {

    @Input() priority = 0;
    @Input() displayName!: string;

    constructor() { }

    ngOnInit(): void {
    }
}