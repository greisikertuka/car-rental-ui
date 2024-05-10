import {Component, OnInit} from '@angular/core';
import {Booking, User} from "../../generated-code";
import {BookingsOverview} from "../../api-client/endpoint/rent/bookings-overview";
import {AuthService} from "../../authentication/auth.service";

@Component({
  selector: 'app-bookings-overview',
  templateUrl: './bookings-overview.component.html',
  styleUrls: ['./bookings-overview.component.scss']
})
export class BookingsOverviewComponent implements OnInit {
  bookings: Booking[] = [];
  user!: User;

  constructor(private bookingService: BookingsOverview, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(
      (user) => this.user = user!
    );
    this.fetchBookings();
  }

  fetchBookings() {
    this.bookingService.getBookingsByUserId(this.user.id!).subscribe(
      (response: Booking[]) => {
        this.bookings = response;
      },
      error => {
        console.error('Error fetching bookings:', error);
      }
    );
  }
}
