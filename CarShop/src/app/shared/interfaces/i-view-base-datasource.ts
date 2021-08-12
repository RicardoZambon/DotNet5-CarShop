import { QueryList } from '@angular/core';

import { EditSectionComponent } from '../components/edit/edit-section/edit-section.component';

export interface IViewBaseDatasource {
    titles: QueryList<EditSectionComponent>;
}