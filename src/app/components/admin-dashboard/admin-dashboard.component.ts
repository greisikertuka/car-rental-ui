import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoutesPath} from "../../shared/routes";
import {AppColors} from "../../shared/colors";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AdminUserTableComponent } from '../admin-user-table/admin-user-table.component';
import { AdminCarTableComponent } from '../admin-car-table/admin-car-table.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterLink,
    AdminUserTableComponent,
    AdminCarTableComponent
  ],
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
