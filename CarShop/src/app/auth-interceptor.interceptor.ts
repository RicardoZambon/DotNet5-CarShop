import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthenticationService } from './shared/services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private refreshTokenRequest: Observable<string> | null = null;

    constructor(private authenticationService: AuthenticationService, private jwtInterceptor: JwtInterceptor) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (request.url.indexOf(environment.apiUrl) >= 0 && !this.jwtInterceptor.isDisallowedRoute(request)) { /* this.jwtInterceptor.isAllowedDomain(request) */
            
            if (this.authenticationService.isTokenExpired()) {
                if (!this.refreshTokenRequest) {
                    this.refreshTokenRequest = from(this.authenticationService.tryRefreshToken());
                }

                return this.refreshTokenRequest
                    .pipe(
                        switchMap(token => {
                            this.refreshTokenRequest = null;
                            
                            return next.handle(
                                request.clone({ setHeaders: { 'authorization': `Bearer ${token}` } })
                            );
                        })
                    );
            }

        }
        return next.handle(request);
    }
}