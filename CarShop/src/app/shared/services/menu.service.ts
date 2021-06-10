import { MenuResponse } from './../models/menu-response';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { MenuItem } from '../components/nav-drawer/menu-item';
import { TranslateService } from '@ngx-translate/core';
import { Routes } from '@angular/router';
import { HomeLayoutComponent } from 'src/app/layout/home-layout/home-layout.component';
import { DashboardComponent } from 'src/app/pages/home/main/dashboard/dashboard.component';
import { UsersListComponent } from 'src/app/pages/security/users/list/list.component';
import { AuthGuard } from '../guard/auth.guard';
import { LoginLayoutComponent } from 'src/app/layout/login-layout/login-layout.component';
import { LoginComponent } from 'src/app/pages/authentication/login/login.component';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private baseUrl = `${environment.apiUrl}/Main`;

    constructor(private http: HttpClient, private translateService: TranslateService) { }

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

    public async getRoutes(): Promise<Routes> {
        return await of([
            {
                path: '',
                component: HomeLayoutComponent,
                children: [
                    { path: '', redirectTo: 'home', pathMatch: 'full' },
                    
                    { path: 'home', children: [
                        { path: '', component: DashboardComponent, pathMatch: 'full' },
                        { path: 'dashboard', component: DashboardComponent },
                    ]},
        
                    { path: 'users', children: [
                        { path: '', component: UsersListComponent, pathMatch: 'full' },
                        { path: ':id', component: DashboardComponent },
                    ]}
                ],
                canActivate: [AuthGuard]
            },
            {
                path: '',
                component: LoginLayoutComponent,
                children: [
                    { path: '', redirectTo: 'login', pathMatch: 'full' },
                    { path: 'login', component: LoginComponent }
                ]
            }
        ]).toPromise();
    }
}