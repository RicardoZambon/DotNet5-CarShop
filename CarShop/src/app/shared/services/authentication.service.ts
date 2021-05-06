import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private baseUrl = `${environment.apiUrl}/api/user`;

    constructor(private router: Router, private http: HttpClient) { }

    isAuthenticated(): boolean {
        return false;
    }

    getUserToken(): string | null {
        return localStorage.getItem("token");
    }

    authenticate() : void {

    }

    refreshToken(): Observable<object> {
        let params = { };

        return this.http.post(`${this.baseUrl}/RefreshToken`, {}, { params: params });
    }
}