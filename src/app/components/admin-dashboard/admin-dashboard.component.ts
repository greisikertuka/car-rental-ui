import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoutesPath} from "../../shared/routes";
import {AppColors} from "../../shared/colors";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  constructor(private router: Router) {
  }

  navigateToUsers() {
    this.router.navigate([RoutesPath.adminUserTable])
  }

  navigateToCars() {
    this.router.navigate([RoutesPath.adminCarTable])
  }

  protected readonly AppColors = AppColors;
}
