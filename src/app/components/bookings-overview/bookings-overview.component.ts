import {Component, OnInit, ViewChild} from '@angular/core';
import {Booking, BookingStatus, User} from "../../generated-code";
import {AuthService} from "../../authentication/auth.service";
import {AppColors} from "../../shared/colors";
import {MatTableDataSource} from "@angular/material/table";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatDialog} from "@angular/material/dialog";
import {ViewRatingDialogComponent} from "./view-rating/view-rating-dialog.component";
import {AddRatingComponent} from "./add-rating/add-rating.component";
import {RatingEndpointApi} from "../../api-client/endpoint/rating-endpoint-api";
import {BookingEndpointApi} from "../../api-client/endpoint/booking-endpoint-api";
import {convertToCamelCase} from "../../shared/helpers";
import {ChangeStatusComponent} from "./change-status/change-status.component";

@Component({
  selector: 'app-bookings-overview',
  templateUrl: './bookings-overview.component.html',
  styleUrls: ['./bookings-overview.component.scss']
})
export class BookingsOverviewComponent implements OnInit {
  bookings: Booking[] = [];
  user!: User;
  dataSource: MatTableDataSource<Booking> = new MatTableDataSource();

  displayedColumns: string[] = ['car', 'total', 'bookingStatus', 'fullName', 'email', 'phone', 'startDate', 'endDate', 'timeStamp', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar,
              private _liveAnnouncer: LiveAnnouncer,
              public dialog: MatDialog,
              private addRatingEndpoint: RatingEndpointApi,
              private rentCarEndpoint: BookingEndpointApi) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(
      (user) => this.user = user!
    );
    this.fetchBookings();
  }

  fetchBookings() {
    this.rentCarEndpoint.getBookingsByUserId(this.user.id!).subscribe(
      (response: Booking[]) => {
        this.bookings = response;
        this.dataSource = new MatTableDataSource<Booking>(this.bookings);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      () => {
        this.snackBar.open('Error while getting bookings!', 'Close', {
          duration: 1500,
          panelClass: ["error-snackbar"]
        })
      }
    );
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openViewRatingDialog(booking: Booking): void {
    this.dialog.open(ViewRatingDialogComponent, {
      width: '350px',
      height: '350px',
      data: {title: 'View Rating', booking: booking}
    });
  }

  openAddRatingDialog(booking: Booking): void {
    const dialogRef = this.dialog.open(AddRatingComponent, {
      width: '400px',
      height: '450px',
      data: {title: 'Add Rating', booking: booking}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addRatingEndpoint.addRating(result.car.id, result.user.id, booking.id!, result).subscribe(
          () => {
            this.snackBar.open('The review was added successfully!', 'Close', {
              duration: 1500,
              panelClass: ["success-snackbar"]
            });
            this.fetchBookings();
          },
          () => this.snackBar.open('There was an error when adding the review!', 'Close', {
            duration: 1500,
            panelClass: ["error-snackbar"]
          })
        );
      }
    });
  }

  openChangeStatusDialog(booking: Booking): void {
    const dialogRef = this.dialog.open(ChangeStatusComponent, {
      width: '300px',
      height: '200px',
      data: {title: 'Are you sure you want to cancel this booking?', booking: booking}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let canceledBooking: Booking = {
          id: booking.id,
          bookingStatus: BookingStatus.Canceled,
          email: booking.email,
          endDate: booking.endDate,
          lastName: booking.lastName,
          name: booking.name,
          phone: booking.phone,
          startDate: booking.startDate,
          total: booking.total,
          rating: booking.rating,
          timeStamp: booking.timeStamp,
          car: booking.car,
          user: booking.user,
        }
        this.rentCarEndpoint.updateBooking(canceledBooking).subscribe(
          () => {
            this.snackBar.open('The booking was cancelled!', 'Close', {
              duration: 1500,
              panelClass: ["warning-snackbar"]
            });
            this.fetchBookings();
          },
          () => this.snackBar.open('There was an error when cancelling the booking!', 'Close', {
            duration: 1500,
            panelClass: ["error-snackbar"]
          })
        );
      }
    });
  }

  protected readonly AppColors = AppColors;
  protected readonly convertToCamelCase = convertToCamelCase;
}

export interface DialogData {
  title: string;
  booking: Booking;
}
