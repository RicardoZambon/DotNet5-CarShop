import { EventEmitter, QueryList } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { AlertService } from '../services/alert.service';
import { EditSectionComponent } from '../components/edit/edit-section/edit-section.component';
import { IBaseView } from '../interfaces/i-base-view';
import { MessageModel } from '../models/message-model';
import { TabService } from '../services/tab.service';

export abstract class BaseView implements IBaseView {
    
    currentUrl!: string;
    entityId?: number;

    title?: string;
    titleFailureMessage?: string;

    titleUpdated = new EventEmitter();

    titles?: QueryList<EditSectionComponent>;

    get formDisabled(): boolean { return false; }


    constructor(
        protected alertService: AlertService,
        protected tabService: TabService,
        protected route: ActivatedRoute) {
    }

    abstract getTitle(): Promise<string>;


    async initTab(): Promise<void> {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.entityId = parseInt(id);
        }
        else {
            this.entityId = undefined;
        }

        await this.refresh();
    }

    async refresh(): Promise<void> {
        this.tabService.openView(this, this.route.pathFromRoot.map(r => r.snapshot.url).filter(f => !!f[0]).map(([f]) => f.path).join('/'));

        await this.refreshModel();
    }

    async refreshModel(model?: any): Promise<void> {
        await this.getTitle()
            .then(x => {
                this.title = x;
                this.titleUpdated.emit();
            })
            .catch(ex => {
                this.alertService.raiseError(new MessageModel('AlertFailure-Title', this.titleFailureMessage ?? '', false), ex);
                throw ex;
            });
    }


    isValid(): boolean {
        return true;
    }
    showValidation(): void {
    }
    disableForm(): void {
    }
    async saveView(): Promise<any> {
    }


    protected getViewRoute(params?: { [key: string] : string }): string {
        let route: ActivatedRouteSnapshot | null = this.route.snapshot;
        const currentRoute: string[] = new Array<string>();

        if (!params) {
            params = {};
        }

        let hasView = false;
        while (route != null) {
            let routePath = route.routeConfig?.path ?? '';

            if (route.paramMap.has('view')) {
                hasView = true;
            }

            route.paramMap.keys.forEach(k => {
                routePath = routePath.replace(':' + k,
                    k in (params ?? {})
                    ? ( params ?? {} )[k]
                    : (route?.paramMap.get(k) ?? '')
                );
            });

            if (routePath !== '') {
                currentRoute.push(routePath);
            }
            route = route.parent;
        }

        const viewPath = !hasView && 'view' in params && params['view'] !== ''
            ? '/' + params['view']
            : '';

        return currentRoute.reverse().join('/') + viewPath;
    }
}