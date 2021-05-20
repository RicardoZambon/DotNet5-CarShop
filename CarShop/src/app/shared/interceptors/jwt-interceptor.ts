/*import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }  

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        
        if (isApiUrl && this.authenticationService.isAuthenticated()) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${this.authenticationService.getUserToken()}` }
            });
        }
        return next.handle(request);
    }
}*/