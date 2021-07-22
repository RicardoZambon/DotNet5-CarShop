import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TabService } from 'src/app/shared/services/tab.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class RolesEditComponent implements OnInit {

    roleId!: string;

    constructor(private tabService: TabService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');

        
        if (id) {
            this.roleId = id;
            this.tabService.openCurrentUrl(`User ${this.roleId}`);
        }
    }

}
