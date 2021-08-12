import { QueryList } from '@angular/core';

import { EditSectionComponent } from '../components/edit/edit-section/edit-section.component';
import { IViewBaseDatasource } from '../interfaces/i-view-base-datasource';

export abstract class ViewBaseDatasource implements IViewBaseDatasource {
    abstract titles: QueryList<EditSectionComponent>;
}