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
import {CarCardComponent} from './shared/car-card/car-card.component';
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
import {FormsModule} from "@angular/forms";


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
    ForbiddenComponent
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
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
