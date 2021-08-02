import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TabService } from './../../../../shared/services/tab.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class UsersEditComponent implements OnInit {

    private userId!: string;

    constructor(private tabService: TabService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');

        if (id) {
            this.userId = id;
            //this.tabService.openCurrentUrl(`User ${this.userId}`);
        }
    }
}