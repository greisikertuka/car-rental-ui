import {Component, OnInit} from '@angular/core';
import {AppColors} from "../colors";
import {AuthService} from "../../authentication/auth.service";
import {RoutesPath} from "../routes";
import {Role} from "../../generated-code";
import {MatSnackBar} from "@angular/material/snack-bar";


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

  loggedIn: boolean = false;
  role?: Role;
  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
  }

  protected readonly AppColors = AppColors;
  protected readonly RoutesPath = RoutesPath;
  protected readonly Role = Role;

  logout() {
    this.authService.logout();
    this.snackBar.open(`Successfully logged out!`, 'Close', {
      duration: 1500,
      panelClass: ["success-snackbar"]
    });
    window.location.reload();
  }
}
