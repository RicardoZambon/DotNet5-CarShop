import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { MenuItem } from '../components/nav-drawer/menu-item';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    constructor() { }

    async getMenus(): Promise<MenuItem[]> {
        return await of('')
            .pipe(
                //delay(5000),
                map(() => {
                    const data = [
                        { id: 1, parentId: null, label: 'Dashboards', icon: 'th-large', url: 'home' },
                        { id: 2, parentId: null, label: 'Security', icon: 'shield-alt' },
                            { id: 3, parentId: 2, label: 'Users', icon: 'user', url: 'users' },
                            { id: 4, parentId: 2, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 5, parentId: 2, label: 'Pages', icon: 'user', url: 'users' },
                                { id: 6, parentId: 5, label: 'Access', icon: 'user', url: 'users' },
                            { id: 7, parentId: 2, label: 'Something', icon: 'user', url: 'users' },
                        { id: 9, parentId: null, label: 'Security', icon: 'shield-alt' },
                            { id: 10, parentId: 9, label: 'Users', icon: 'user', url: 'users' },
                            { id: 11, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 50, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 51, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 52, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 53, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 54, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 55, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 56, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 57, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 58, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 59, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 60, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 61, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 62, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 63, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 64, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 65, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 66, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 67, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 68, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 69, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 70, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 71, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 72, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 73, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 74, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 75, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 76, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 77, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 78, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 79, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 80, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 81, parentId: 9, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 12, parentId: 9, label: 'Pages', icon: 'user', url: 'users' },
                                { id: 13, parentId: 12, label: 'Access', icon: 'user', url: 'users' },
                            { id: 14, parentId: 9, label: 'Something', icon: 'user', url: 'users' },
                        { id: 8, parentId: null, label: 'Test', icon: 'user', url: 'users' },
                        { id: 15, parentId: null, label: 'Test', icon: 'user', url: 'users' },
                        { id: 16, parentId: null, label: 'Test', icon: 'user', url: 'users' },
                        { id: 17, parentId: null, label: 'Test', icon: 'user', url: 'users' },
                        { id: 18, parentId: null, label: 'Test', icon: 'user', url: 'users' },
                        { id: 19, parentId: null, label: 'Test', icon: 'user', url: 'users' },
                        { id: 20, parentId: null, label: 'Test', icon: 'user', url: 'users' },
                        { id: 21, parentId: null, label: 'Test', icon: 'user', url: 'users' },
                        { id: 22, parentId: null, label: 'Test', icon: 'user', url: 'users' },
                        { id: 23, parentId: null, label: 'Test', icon: 'user', url: 'users' },
                        { id: 24, parentId: null, label: 'Test', icon: 'user', url: 'users' },
                        { id: 25, parentId: null, label: 'Test', icon: 'user', url: 'users' },
                        { id: 26, parentId: null, label: 'Test', icon: 'user', url: 'users' },
                        { id: 27, parentId: null, label: 'Test', icon: 'user', url: 'users' },
                        { id: 28, parentId: null, label: 'Test', icon: 'user', url: 'users' },
                        { id: 29, parentId: null, label: 'Test', icon: 'user', url: 'users' },
                        { id: 30, parentId: null, label: 'Test', icon: 'user', url: 'users' },
                        { id: 31, parentId: null, label: 'Test', icon: 'user', url: 'users' },
                        { id: 38, parentId: null, label: 'Security', icon: 'shield-alt' },
                            { id: 39, parentId: 38, label: 'Users', icon: 'user', url: 'users' },
                            { id: 40, parentId: 38, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 41, parentId: 38, label: 'Pages', icon: 'user', url: 'users' },
                                { id: 42, parentId: 41, label: 'Access', icon: 'user', url: 'users' },
                            { id: 43, parentId: 38, label: 'Something', icon: 'user', url: 'users' },
                        { id: 32, parentId: null, label: 'Test', icon: 'user', url: 'users' },
                        { id: 33, parentId: null, label: 'Test', icon: 'user', url: 'users' },
                        { id: 34, parentId: null, label: 'Test', icon: 'user', url: 'users' },
                        { id: 35, parentId: null, label: 'Test', icon: 'user', url: 'users' },
                        { id: 36, parentId: null, label: 'Test', icon: 'user', url: 'users' },
                        { id: 37, parentId: null, label: 'Test', icon: 'user', url: 'users' },
                        { id: 44, parentId: null, label: 'Security', icon: 'shield-alt' },
                            { id: 45, parentId: 44, label: 'Users', icon: 'user', url: 'users' },
                            { id: 46, parentId: 44, label: 'Roles', icon: 'user', url: 'users' },
                            { id: 47, parentId: 44, label: 'Pages', icon: 'user', url: 'users' },
                                { id: 48, parentId: 47, label: 'Access', icon: 'user', url: 'users' },
                            { id: 49, parentId: 44, label: 'Something', icon: 'user', url: 'users' },
                    ];

                    let mapMenu = function(parent: MenuItem | null) {
                        return data
                            .filter(el => el.parentId === ((parent) ? parent.id : null))
                            .map(item => {
                                let menuItem = new MenuItem();
                                
                                menuItem.parent = parent;
                                menuItem.id = item.id;
            
                                menuItem.label = item.label;
                                menuItem.icon = item.icon;
                                menuItem.url = item.url;
            
                                menuItem.children = mapMenu(menuItem);
            
                                return menuItem;
                            });
                    };

                    return mapMenu(null);
                })
            ).toPromise();
        ;
    }
}