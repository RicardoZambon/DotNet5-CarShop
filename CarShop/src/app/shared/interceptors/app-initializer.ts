import { first } from "rxjs/operators";

import { AuthenticationService } from "../services/authentication.service";

export function appInitializer(authenticationService: AuthenticationService) {
    return () => new Promise(resolve => {
        authenticationService.refreshToken()
            .pipe(first())
            .subscribe({
                next: () => { },
                error: error => {
                    console.log(error);
                }
            })
            .add(resolve);
    });
}
