import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    collapsed: boolean = false;
        
    constructor() { }

    ngOnInit(): void {
    }


    public toggleState() {
        console.log('toggle state');
        this.collapsed = !this.collapsed;
    }

}
