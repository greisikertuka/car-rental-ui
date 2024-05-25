import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {adminRoutes, userRoutes} from "../../shared/helpers";
import {RoutesPath} from "../../shared/routes";
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isLoggedIn = false;
    let role: string | undefined;
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => isLoggedIn = isAuthenticated);
    this.authService.user$.subscribe((user) => role = user?.role);

    let isUser = role == 'USER';
    let isAdmin = role == 'ADMIN';

    // Route path
    const {routeConfig} = route;
    const {path} = routeConfig as Route;

    if (path && path.includes(RoutesPath.login)) {
      if (!isLoggedIn) {
        return true;
      } else {
        this.router.navigateByUrl(RoutesPath.home);
        return false;
      }
    } else if (path && userRoutes.indexOf(path) != -1) {
      if (isLoggedIn) {
        return true;
      } else {
        this.saveToLocalStorage(path, route);
        this.router.navigate([RoutesPath.login], {queryParams: {"requireAccess": "true"}});
        return false;
      }
    } else if (path && adminRoutes.indexOf(path) != -1) {
      if (isUser) {
        this.router.navigateByUrl(RoutesPath.home);
        return false;
      } else if (isAdmin) {
        return true;
      } else {
        this.router.navigateByUrl(RoutesPath.forbidden);
        return false;
      }
    }
    this.router.navigateByUrl(RoutesPath.home);
    return false;

  }

  saveToLocalStorage(path: string, route: ActivatedRouteSnapshot) {
    localStorage.setItem('path', path);
    console.log(route.queryParams);
    localStorage.setItem('queryParams', JSON.stringify(route.queryParams || {}));
  }
}
