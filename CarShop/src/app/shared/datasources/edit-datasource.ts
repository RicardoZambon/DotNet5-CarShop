import { ActivatedRoute } from '@angular/router';

import { EditContainerComponent } from '../components/edit/edit-container/edit-container.component';
import { IDetailsDatasource } from '../interfaces/i-details-datasource';
import { IEditDatasource } from '../interfaces/i-edit-datasource';
import { MenuItem } from '../components/common/button-dropdown/menu-item';
import { MessageModel } from '../models/message-model';
import { AlertService } from '../services/alert.service';
import { TabService } from '../services/tab.service';
import { ViewBaseDatasource } from 'src/app/shared/datasources/view-base-datasource';

export abstract class EditDatasource implements IEditDatasource {
    
    abstract editContainer: EditContainerComponent;
    abstract details: IDetailsDatasource;
    abstract history: ViewBaseDatasource;


    abstract failureMessage: string;

    entityId: number | null = null;
    title: string = '';

    /* Views */
    viewOptionDetails = new MenuItem('Button-Views-Details', 'dice-d6', async () => { await this.changeView('details'); });
    viewOptionHistory = new MenuItem('Button-Views-History', 'history', async () => { await this.changeView('history'); });

    activeView!: MenuItem;
    activeViewName!: string;
    viewsOptions = new Array<MenuItem>();


    constructor(
        protected alertService: AlertService,
        protected tabService: TabService,
        protected route: ActivatedRoute
    ) {    
    }


    abstract getTitle(): Promise<string>;


    async initTab(): Promise<void> {
        const id = this.route.snapshot.paramMap.get('id');
        const url = this.route.pathFromRoot.map(r => r.snapshot.url).filter(f => !!f[0]).map(([f]) => f.path).join('/');

        this.changeView('details');

        this.refresh({ entityId: id, url });
    }

    async refresh(model: { entityId: string | null, url: string }): Promise<void> {
        if (model.entityId) {
            this.entityId = parseInt(model.entityId);
        }
        else {
            this.entityId = null;
        }

        this.title = await this.getTitle()
            .catch(ex => {
                this.alertService.raiseError(new MessageModel('AlertFailure-Title', this.failureMessage, false), ex);
                throw ex;
            });

        this.tabService.openTab(this.title, model.url);

        this.refreshViews();
    }

    refreshViews() {
        this.viewsOptions = [];

        this.viewsOptions.push(this.viewOptionDetails);

        if (this.entityId) {
            this.viewsOptions.push(this.viewOptionHistory);
        }
    }


    isActiveView(view: string) : boolean {
        return this.activeViewName === view;
    }

    async changeView(newViewName: string): Promise<void> {

        let newView: MenuItem;
        switch (newViewName) {
            case 'history': 
                newView = this.viewOptionHistory;
                break;
            default:
                newView = this.viewOptionDetails;
                break;
        }

        if (this.activeView) {
            this.activeView.active = false;
        }

        this.activeView = newView;
        this.activeView.active = true;
        this.activeViewName = newViewName;

        this.refreshScrollSpy();
    }

    refreshScrollSpy(): void {
        if (this.editContainer) {
            setTimeout(() => {
                switch (this.activeViewName) {
                    case 'history': 
                        this.editContainer.titles = this.history.titles.toArray();
                        break;
                    default:
                        this.editContainer.titles = this.details.titles.toArray();
                        break;
                }
            }, 10);
        }
    }
}