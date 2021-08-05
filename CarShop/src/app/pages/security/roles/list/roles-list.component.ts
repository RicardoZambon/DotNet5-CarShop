import { Component } from '@angular/core';
@Component({
    selector: 'app-list',
    template: `
        <app-roles-list-buttons [datasource]="grid.datasource"></app-roles-list-buttons>
        <app-roles-list-grid class="d-flex flex-grow-1" #grid></app-roles-list-grid>
    `
})
export class RolesListComponent{
}