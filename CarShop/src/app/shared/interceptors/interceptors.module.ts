import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt-interceptor';

import { AuthenticationService } from '../services/authentication.service';
import { appInitializer } from './app-initializer';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        JwtInterceptor,
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializer,
            multi: true,
            deps: [AuthenticationService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        }
    ]
})
export class InterceptorsModule { }