import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {BookingsOverviewComponent} from "./components/bookings-overview/bookings-overview.component";
import {CarDetailsComponent} from "./components/car-details/car-details.component";
import {LoginComponent} from "./components/login/login.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {RentComponent} from "./components/rent/rent.component";
import {RoutesPath} from "./shared/routes";
import {AuthGuard} from "./authentication/guard/auth.guard";
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import {ForbiddenComponent} from "./components/forbidden/forbidden.component";

export const routes: Routes = [
  {path: RoutesPath.home, component: HomeComponent},
  {path: RoutesPath.bookingsOverview, component: BookingsOverviewComponent, canActivate: [AuthGuard]},
  {path: RoutesPath.carDetails, component: CarDetailsComponent},
  {path: RoutesPath.login, component: LoginComponent, canActivate: [AuthGuard]},
  {path: RoutesPath.pageNotFound, component: PageNotFoundComponent, canActivate: [AuthGuard]},
  {path: RoutesPath.profile, component: ProfileComponent, canActivate: [AuthGuard]},
  {path: RoutesPath.rent, component: RentComponent, canActivate: [AuthGuard]},
  {path: RoutesPath.adminDashboard, component: AdminDashboardComponent, canActivate: [AuthGuard]},
  {path: RoutesPath.forbidden, component: ForbiddenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
