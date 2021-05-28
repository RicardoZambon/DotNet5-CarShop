import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AuthGuard } from './shared/guard/auth.guard';

import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { DashboardComponent } from './pages/home/main/dashboard/dashboard.component';

import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { LoginComponent } from './pages/authentication/login/login.component';


const routes: Routes = [
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
                { path: '', component: DashboardComponent, pathMatch: 'full' },
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
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        JwtModule.forRoot({
            config: {
                tokenGetter: () => localStorage.getItem("jwt"),
            }
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }