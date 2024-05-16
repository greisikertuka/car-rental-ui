import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {AppColors} from "../colors";
import {AuthService} from "../../authentication/auth.service";
import {RoutesPath} from "../routes";
import {Role} from "../../generated-code";


@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit {
  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(
      (isLoggedIn) => this.loggedIn = isLoggedIn
    );
    this.authService.user$.subscribe(
      (user) => this.role = user?.role
    );
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  loggedIn: boolean = false;
  role?: Role;

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {
  }

  protected readonly AppColors = AppColors;

  protected readonly RoutesPath = RoutesPath;
  protected readonly Role = Role;
}
