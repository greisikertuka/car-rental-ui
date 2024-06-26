import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BookingsOverviewComponent} from './components/bookings-overview/bookings-overview.component';
import {CarDetailsComponent} from './components/car-details/car-details.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ProfileComponent} from './components/profile/profile.component';
import {RentComponent} from './components/rent/rent.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientModule} from "@angular/common/http";
import {CarCardComponent} from './components/home/car-card/car-card.component';
import {NgOptimizedImage} from "@angular/common";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {AppNavbarComponent} from './shared/app-navbar/app-navbar.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {AdminDashboardComponent} from './components/admin-dashboard/admin-dashboard.component';
import {ForbiddenComponent} from './components/forbidden/forbidden.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatLineModule, MatNativeDateModule} from "@angular/material/core";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatExpansionModule} from "@angular/material/expansion";
import {CdkAccordionModule} from "@angular/cdk/accordion";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ViewRatingDialogComponent} from './components/bookings-overview/view-rating/view-rating-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {AddRatingComponent} from './components/bookings-overview/add-rating/add-rating.component';
import {AdminUserTableComponent} from "./components/admin-user-table/admin-user-table.component";
import {AdminCarTableComponent} from "./components/admin-car-table/admin-car-table.component";
import {AddCarComponent} from './components/admin-car-table/add-car/add-car.component';
import {ConfirmDialogComponent} from './shared/approve-dialog/confirm-dialog.component';
import {MatSelectModule} from "@angular/material/select";
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {AddUserComponent} from './components/admin-user-table/add-user/add-user.component';
import {CookieService} from "ngx-cookie-service";
import {MatGridListModule} from "@angular/material/grid-list";

@NgModule({
  declarations: [
    AppComponent,
    BookingsOverviewComponent,
    CarDetailsComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    ProfileComponent,
    RentComponent,
    CarCardComponent,
    AppNavbarComponent,
    AppNavbarComponent,
    AdminDashboardComponent,
    ForbiddenComponent,
    ViewRatingDialogComponent,
    AddRatingComponent,
    AdminUserTableComponent,
    AdminCarTableComponent,
    AddCarComponent,
    ConfirmDialogComponent,
    UserDetailsComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatLineModule,
    MatSnackBarModule,
    MatExpansionModule,
    CdkAccordionModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule,
    MatGridListModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
