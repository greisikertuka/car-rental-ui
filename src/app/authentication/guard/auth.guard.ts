import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, UrlTree } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { adminRoutes, userRoutes } from "../../shared/helpers";
import { RoutesPath } from "../../shared/routes";
import { AuthService } from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return combineLatest([this.authService.isAuthenticated$, this.authService.user$]).pipe(
      map(([isAuthenticated, user]) => {
        const role = user?.role;
        const isUser = role === 'USER';
        const isAdmin = role === 'ADMIN';

        // Route path
        const { routeConfig } = route;
        const { path } = routeConfig as Route;

        if (path && path.includes(RoutesPath.login)) {
          if (!isAuthenticated) {
            return true;
          } else {
            this.router.navigateByUrl(RoutesPath.home);
            return false;
          }
        } else if (path && userRoutes.indexOf(path) !== -1) {
          if (isAuthenticated) {
            return true;
          } else {
            this.saveToLocalStorage(path, route);
            this.router.navigate([RoutesPath.login], { queryParams: { "requireAccess": "true" } });
            return false;
          }
        } else if (path && adminRoutes.indexOf(path) !== -1) {
          if (isAdmin) {
            return true;
          } else if (isUser) {
            this.router.navigateByUrl(RoutesPath.home);
            return false;
          } else {
            this.router.navigateByUrl(RoutesPath.forbidden);
            return false;
          }
        }
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigate([RoutesPath.login], { queryParams: { "requireAccess": "true" } });
          return false;
        }
      })
    );
  }

  private saveToLocalStorage(path: string, route: ActivatedRouteSnapshot): void {
    localStorage.setItem('path', path);
    localStorage.setItem('queryParams', JSON.stringify(route.queryParams || {}));
  }
}
