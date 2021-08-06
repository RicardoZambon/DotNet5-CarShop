import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login-model';
import { LoginResponse } from '../models/login-response';
import { UserInfoResponse } from './../models/user-info-response';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private baseUrl = `${environment.apiUrl}/Authentication`;


    private get username(): string | null {
        return localStorage.getItem('username');
    }
    private set username(value: string | null) {
        if (value) {
            localStorage.setItem('username', value);
        }
        else {
            localStorage.removeItem('username');
        }
    }

    private get token(): string | null {
        return localStorage.getItem('jwt');
    }
    private set token(value: string | null) {
        if (value) {
            localStorage.setItem('jwt', value);
        }
        else {
            localStorage.removeItem('jwt');
        }
    }

    private get refreshToken(): string | null {
        return localStorage.getItem('refreshToken');
    }
    private set refreshToken(value: string | null) {
        if (value) {
            localStorage.setItem('refreshToken', value);
        }
        else {
            localStorage.removeItem('refreshToken');
        }
    }

    private get userInfo(): string | null {
        return localStorage.getItem('userInfo');
    }
    private set userInfo(value: string | null) {
        if (value) {
            localStorage.setItem('userInfo', value);
        }
        else {
            localStorage.removeItem('userInfo');
        }
    }


    constructor(private router: Router, private http: HttpClient, private jwtHelper: JwtHelperService) { }


    public isAuthenticated(): boolean {
        return this.username !== null;
    }

    public isTokenExpired(): boolean {
        return (this.token !== null && this.jwtHelper.isTokenExpired(this.token));
    }
    
    public getInfo(): UserInfoResponse {
        return JSON.parse(atob(localStorage.getItem('userInfo') ?? ''));
    }


    public async authenticate(model: LoginModel): Promise<string> {
        return await this.http
            .post<LoginResponse>(`${this.baseUrl}/SignIn`, model)
            .pipe(
                map((res: LoginResponse) => {

                    this.username = res.username;
                    this.token = res.token;
                    this.refreshToken = res.refreshToken;

                    this.userInfo = btoa(JSON.stringify(res as UserInfoResponse));

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
                            console.log(error);
                            return of('InternalServerError').pipe(delay(5000));
                    }
                })
            ).toPromise();
    }

    public async tryRefreshToken(): Promise<string> {
        return await this.http
            .post<LoginResponse>(`${this.baseUrl}/RefreshToken`, {
                username: this.username ?? '',
                refreshToken: this.refreshToken ?? ''
            })
            .pipe(
                map((res: LoginResponse) => {

                    this.token = res.token;
                    this.refreshToken = res.refreshToken;

                    this.userInfo = btoa(JSON.stringify(res as UserInfoResponse));

                    return this.token;
                }),
                catchError(() => {
                    return of('').pipe(delay(5000));
                })
            )
            .toPromise();
    }

    public signOut(): void {
        this.username = null;
        this.token = null;
        this.refreshToken = null;

        this.userInfo = null;
        
        this.router.navigate(["/login"]);
    }
}