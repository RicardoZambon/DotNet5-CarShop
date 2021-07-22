import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { environment } from 'src/environments/environment';
import { AuthGuard } from './shared/guard/auth.guard';

import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { LoginComponent } from './pages/authentication/login/login.component';

import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { MainComponent } from './pages/home/main/main.component';
import { DashboardComponent } from './pages/home/dashboard/dashboard.component';

import { RolesListComponent } from './pages/security/roles/list/list.component';

import { UsersEditComponent } from './pages/security/users/edit/edit.component';
import { UsersListComponent } from './pages/security/users/list/list.component';
import { RolesEditComponent } from './pages/security/roles/edit/edit.component';


const routes: Routes = [
    {
        path: '',
        component: HomeLayoutComponent,
        children: [
            { path: '', component: MainComponent, pathMatch: 'full' },
            
            { path: 'dashboard', component: DashboardComponent },

            { path: 'roles', children: [
                { path: '', component: RolesListComponent, pathMatch: 'full' },
                { path: ':id', component: RolesEditComponent },
            ]},

            { path: 'users', children: [
                { path: '', component: UsersListComponent, pathMatch: 'full' },
                { path: ':id', component: UsersEditComponent },
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
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
        JwtModule.forRoot({
            config: {
                tokenGetter: () => localStorage.getItem("jwt"),
                allowedDomains: [
                    environment.apiUrl.replace(/(^\w+:|^)\/\//, '')
                ],
                disallowedRoutes: [
                    `${environment.apiUrl}/Authentication/RefreshToken`,
                    `${environment.apiUrl}/Authentication/SignIn`
                ]
            }
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}