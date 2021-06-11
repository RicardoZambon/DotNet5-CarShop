import { MenuResponse } from './../models/menu-response';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { MenuItem } from '../components/nav-drawer/menu-item';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private baseUrl = `${environment.apiUrl}/Main`;

    constructor(
        private http: HttpClient,
        private translateService: TranslateService
    ) { }

    public async getMenus(): Promise<string | MenuItem[]> {
        
        const translate = this.translateService;
        
        return await this.http
            .get(`${this.baseUrl}/GetMenus`)
            .pipe(
                map(res => {
                    let mapMenu = function(parent: MenuItem | null) {
                        
                        return (res as MenuResponse[])
                            .filter(el => el.parentMenuID === ((parent) ? parent.id : null))
                            .map(item => {
                                let menuItem = new MenuItem();
                                
                                menuItem.parent = parent;
                                menuItem.id = item.id;
            
                                translate.get(item.label).subscribe((text: string) => menuItem.label = text);

                                menuItem.icon = item.icon;
                                menuItem.url = item.url;
            
                                menuItem.children = mapMenu(menuItem);
            
                                return menuItem;
                            });
                    };

                    return mapMenu(null);
                }),

                catchError((error: HttpErrorResponse) => {
                    switch(error.status) {
                        default:
                            return of('InternalServerError: ' + error.message);
                    }
                })
            ).toPromise();
    }
}