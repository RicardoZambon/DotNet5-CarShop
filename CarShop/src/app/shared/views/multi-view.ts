import { EditSectionComponent } from 'src/app/shared/components/edit/edit-section/edit-section.component';
import { ActivatedRoute } from '@angular/router';

import { AlertService } from '../services/alert.service';
import { BaseView } from './base-view';
import { EditContainerComponent } from '../components/edit/edit-container/edit-container.component';
import { IMultiView } from '../interfaces/i-multi-view';
import { TabService } from '../services/tab.service';
import { SubViewItem } from './sub-view-item';

export abstract class MultiView extends BaseView implements IMultiView {

    abstract editContainer: EditContainerComponent;

    defaultViewName?: string;
    activeViewOption!: SubViewItem;

    viewOptions = new Array<SubViewItem>();


    constructor(
        alertService: AlertService,
        tabService: TabService,
        route: ActivatedRoute
    ) {   
        super (alertService, tabService, route);
    }


    isActiveView(view: string) : boolean {
        return this.activeViewOption?.id === view;
    }

    async initTab(): Promise<void> {
        if (!this.defaultViewName) {
            this.defaultViewName = this.viewOptions[0].id;
        }

        const view = this.route.snapshot.paramMap.get('view');
        this.changeView(view ?? this.defaultViewName, false);

        super.initTab();
    }

    async refreshModel(model?: any): Promise<void> {
        if (model !== undefined) {
            if (!this.entityId && model?.id) {
                this.entityId = model.id;
                this.tabService.redirectTab(this.currentUrl, this.getViewRoute({ id: model.id }));
            }
            else if (this.entityId && !model?.id) {
                this.entityId = undefined;
                this.tabService.redirectTab(this.currentUrl, this.getViewRoute({ id: 'new' }));
            }
        }

        await super.refreshModel(model);

        await Promise.all(
            this.viewOptions.map(async x => {
                x.view.entityId = this.entityId;
                await x.view?.refreshModel(model)
            })
        );

        this.refreshViews();
    }


    protected async changeView(viewName: string, updateUrl?: boolean): Promise<void> {
        if (updateUrl ?? true) {
            const newUrl = this.getViewRoute({ view: viewName === this.defaultViewName ? '' : viewName });
            this.tabService.redirectTab(this.currentUrl, newUrl);
            this.currentUrl = newUrl;
        }

        let viewOption = this.viewOptions.filter(x => x.id === viewName)[0];
        if (viewOption && viewOption.view) {
            
            if (this.activeViewOption) {
                this.activeViewOption.active = false;

                if (this.activeViewOption.visible) {
                    this.activeViewOption.view.visible = false;
                }
            }

            setTimeout(() => {
                viewOption.active = true;
                viewOption.view.visible = true;
                viewOption.view.onViewVisible();

                this.activeViewOption = viewOption;
            });

            this.refreshScrollSpy();
        }
    }


    protected refreshScrollSpy(): void {
        setTimeout(() => {
            this.editContainer.titles = this.activeViewOption?.view?.titles?.toArray() ?? new Array<EditSectionComponent>();
        }, 10);
    }

    protected refreshViews() {
        if (!(this.activeViewOption?.visible ?? false)) {
            this.changeView(this.defaultViewName ?? this.viewOptions[0].id);
        }
    }
}