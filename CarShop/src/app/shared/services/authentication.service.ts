import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login-model';
import { LoginResponse } from '../models/login-response';
import { RefreshTokenModel } from './../models/refresh-token-model';
import { UserInfoResponse } from './../models/user-info-response';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private baseUrl = `${environment.apiUrl}/Authentication`;

    constructor(private router: Router, private http: HttpClient, private jwtHelper: JwtHelperService) { }


    public async isAuthenticated(): Promise<boolean> {
        const token = localStorage.getItem('jwt');

        if (token && !this.jwtHelper.isTokenExpired(token)) {
            return true;
        }
        
        return (await this.tryRefreshingToken({
            username: localStorage.getItem('username')?.toString() ?? '',
            refreshToken: localStorage.getItem('refreshToken')?.toString() ?? ''
        }));
    }

    public async authenticate(model: LoginModel): Promise<string> {
        return await this.http
            .post<LoginResponse>(`${this.baseUrl}/SignIn`, model)
            .pipe(
                delay(5000),
                map((res: LoginResponse) => {

                    localStorage.setItem('username', res.username);
                    localStorage.setItem('jwt', res.token);
                    localStorage.setItem('refreshToken', res.refreshToken);

                    localStorage.setItem('userInfo', btoa(JSON.stringify(res as UserInfoResponse)));

                    of('dummy').pipe(delay(2000)).subscribe(() => {
                        this.router.navigate(["/"]);
                    });

                    return '';
                }),

                catchError((error: HttpErrorResponse) => {
                    switch(error.status) {
                        case 401:
                            return of('InvalidUsernamePassword').pipe(delay(5000));
                        default:
                            return of('InternalServerError').pipe(delay(5000));
                    }
                })
            ).toPromise();
    }

    public getInfo(): UserInfoResponse {
        return JSON.parse(atob(localStorage.getItem('userInfo') ?? ''));
    }

    public async tryRefreshingToken(model: RefreshTokenModel): Promise<boolean> {

        if (!model || !model.username || !model.refreshToken) { 
            return false;
        }

        return await this.http
            .post<LoginResponse>(`${this.baseUrl}/RefreshToken`, model)
            .pipe(
                delay(5000),
                map((res: LoginResponse) => {

                    localStorage.setItem('jwt', res.token);
                    localStorage.setItem('refreshToken', res.refreshToken);

                    localStorage.setItem('userInfo', btoa(JSON.stringify(res as UserInfoResponse)));

                    return true;
                }),
                catchError(() => {
                    return of(false).pipe(delay(5000));
                })
            )
            .toPromise();
    }

    public signOut(): void {
        localStorage.removeItem("username");
        localStorage.removeItem("jwt");
        localStorage.removeItem("refreshToken");
        
        this.router.navigate(["/login"]);
    }
}