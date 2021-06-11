import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

interface RouteStorageObject {
    snapshot: ActivatedRouteSnapshot;
    handle: DetachedRouteHandle | null;
}

//     shouldAttach(route: ActivatedRouteSnapshot): boolean {
//         const routePath = this.getFullRoute(route);
//         // this will be true if the route has been stored before
//         let canAttach: boolean = !!route.routeConfig && !!this.storedRoutes[routePath];
//         // this decides whether the route already stored should be rendered in place of the requested route, and is the return value
//         // at this point we already know that the paths match because the storedResults key is the route.routeConfig.path
//         // so, if the route.params and route.queryParams also match, then we should reuse the component
//         if (canAttach && this.storedRoutes[routePath].handle) {
//             console.log("param comparison:");
//             console.log(this.compareObjects(route.params, this.storedRoutes[routePath].snapshot.params));
//             console.log("query param comparison");
//             console.log(this.compareObjects(route.queryParams, this.storedRoutes[routePath].snapshot.queryParams));
//             let paramsMatch: boolean = this.compareObjects(route.params, this.storedRoutes[routePath].snapshot.params);
//             let queryParamsMatch: boolean = this.compareObjects(route.queryParams, this.storedRoutes[routePath].snapshot.queryParams);
//             console.log("deciding to attach...", route, "does it match?", this.storedRoutes[routePath].snapshot, "return: ", paramsMatch && queryParamsMatch);
//             return paramsMatch && queryParamsMatch;
//         }
//         return false;
//     }
//     private compareObjects(base: any, compare: any): boolean {
//         // loop through all properties in base object
//         for (let baseProperty in base) {
//             // determine if comparison object has that property, if not: return false
//             if (compare.hasOwnProperty(baseProperty)) {
//                 switch(typeof base[baseProperty]) {
//                     // if one is object and other is not: return false
//                     // if they are both objects, recursively call this comparison function
//                     case 'object':
//                         if ( typeof compare[baseProperty] !== 'object' || !this.compareObjects(base[baseProperty], compare[baseProperty]) ) { return false; } break;
//                     // if one is function and other is not: return false
//                     // if both are functions, compare function.toString() results
//                     case 'function':
//                         if ( typeof compare[baseProperty] !== 'function' || base[baseProperty].toString() !== compare[baseProperty].toString() ) { return false; } break;
//                     // otherwise, see if they are equal using coercive comparison
//                     default:
//                         if ( base[baseProperty] != compare[baseProperty] ) { return false; }
//                 }
//             } else {
//                 return false;
//             }
//         }
//         // returns true only after false HAS NOT BEEN returned through all loops
//         return true;
//     }

export class CustomReuseStrategy implements RouteReuseStrategy {
    
    storedRoutes: { [key: string]: RouteStorageObject } = {};


    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        const routePath = this.getFullRoute(route);
        if (route.component && this.storedRoutes[routePath]) {
            //console.log('Detach:', route);
            return true;
        }
        return false;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
        const routePath = this.getFullRoute(route);
        if (route.component && this.storedRoutes[routePath]) {
            this.storedRoutes[routePath].snapshot = route;
            this.storedRoutes[routePath].handle = handle;
            //console.log('Store:', routePath, 'Route:', this.storedRoutes[routePath], 'Into: ', this.storedRoutes);
        }
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        const routePath = this.getFullRoute(route);
        if (route.component && this.storedRoutes[routePath] && this.storedRoutes[routePath].handle) {
            return true;
        }
        return false;
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        const routePath = this.getFullRoute(route);
        if (route.component && this.storedRoutes[routePath]) {
            return this.storedRoutes[routePath].handle;
        }
        return null;
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }


    private getFullRoute(route: ActivatedRouteSnapshot): string {
        let parentRoute = '';
        if (route.parent) {
            parentRoute = this.getFullRoute(route.parent);
            if (parentRoute !== '' && route.routeConfig?.path) {
                parentRoute += '\\';
            }
        }
        return parentRoute + (route.routeConfig?.path ?? '')
    }

    public storeNewRoute(route: string): void {
        let newStoredRoute: RouteStorageObject = {
            snapshot: new ActivatedRouteSnapshot(),
            handle: null
        };
        this.storedRoutes[route] = newStoredRoute;
    }

    public removeRoute(route: string): void {
        delete this.storedRoutes[route];
    }
}