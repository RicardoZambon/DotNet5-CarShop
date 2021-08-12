import { Component, ContentChildren, OnInit, QueryList, ViewChildren } from '@angular/core';
import { EditSectionComponent } from 'src/app/shared/components/edit/edit-section/edit-section.component';
import { ViewBaseDatasource } from 'src/app/shared/datasources/view-base-datasource';

@Component({
    selector: 'app-view-role-history',
    templateUrl: './role-history.component.html'
})
export class RoleViewHistoryComponent extends ViewBaseDatasource implements OnInit {

    @ViewChildren(EditSectionComponent) titles!: QueryList<EditSectionComponent>;

    constructor() {
        super();
    }

    ngOnInit(): void {
    }
}
