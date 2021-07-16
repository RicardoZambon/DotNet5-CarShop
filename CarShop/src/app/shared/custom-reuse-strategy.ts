import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

interface RouteStorageObject {
    snapshot: ActivatedRouteSnapshot;
    handle: DetachedRouteHandle | null;
}

export class CustomReuseStrategy implements RouteReuseStrategy {
    
    storedRoutes: { [key: string]: RouteStorageObject } = {};


    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        const routePath = this.getFullRoute(route);
        if (route.component && this.storedRoutes[routePath]) {
            return true;
        }
        return false;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
        const routePath = this.getFullRoute(route);
        if (route.component && this.storedRoutes[routePath]) {
            this.storedRoutes[routePath].snapshot = route;
            this.storedRoutes[routePath].handle = handle;
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