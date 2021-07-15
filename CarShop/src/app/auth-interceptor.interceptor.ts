import { mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { AuthenticationService } from './shared/services/authentication.service';
import { JwtInterceptor } from '@auth0/angular-jwt';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService, private jwtInterceptor: JwtInterceptor) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (this.jwtInterceptor.isAllowedDomain(request) && !this.jwtInterceptor.isDisallowedRoute(request)) {
            
            if (this.authenticationService.isTokenExpired()) {
                return from(this.authenticationService.isAuthenticated())
                    .pipe(
                        mergeMap(() => {
                            return next.handle(
                                request.clone({
                                    headers: new HttpHeaders({
                                        'authorization': this.authenticationService.getBearer()
                                    })
                                })
                            );
                        })
                    );
            }

        }
        return next.handle(request);
    }
}