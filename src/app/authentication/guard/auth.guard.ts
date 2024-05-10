import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
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
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isLoggedIn = false;
    let role: string | undefined;
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => isLoggedIn = isAuthenticated);
    this.authService.user$.subscribe((user) => role = user?.role);

    // Route path
    const {routeConfig} = route;
    const {path} = routeConfig as Route;

    if (path && path.includes(RoutesPath.login)) {
      if (role != 'USER' && role != 'ADMIN') {
        return true;
      }
    } else if (path && userRoutes.indexOf(path) != -1) {
      if (role == 'USER' || role == 'ADMIN') {
        return true;
      } else {
        this.router.navigateByUrl(RoutesPath.login);
        return false;
      }
    } else if (path && adminRoutes.indexOf(path) != -1) {
      if (role == 'USER') {
        this.router.navigateByUrl(RoutesPath.home);
        return false;
      } else if (role == 'ADMIN') {
        return true;
      } else {
        this.router.navigateByUrl(RoutesPath.forbidden);
        return false;
      }
    }

    this.router.navigateByUrl(RoutesPath.home);
    return false;
  }
}
