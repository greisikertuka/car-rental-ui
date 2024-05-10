import {Component, OnInit} from '@angular/core';
import {BookingStatus, Car, User} from "../../generated-code";
import {ActivatedRoute, Router} from "@angular/router";
import {CarRentalApi} from "../../service/car-rental-api.service";
import {AuthService} from "../../authentication/auth.service";
import {RentCar} from "../../api-client/endpoint/rent/rent-car";
import {RoutesPath} from "../../shared/routes";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carRentalApi: CarRentalApi,
    private authService: AuthService,
    private bookingService: RentCar,
    private snackBar: MatSnackBar) {
  }

  carId!: number;
  userId!: number;
  startDate: number = Date.now();
  endDate: number = Date.now();
  car!: Car;
  user!: User;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.carId = +params['carId'];
    });
    this.authService.user$.subscribe((user) => {
      this.user = user!;
      this.userId = user!.id!;
    });

    this.carRentalApi.carEndpointService.carsGetIdGet(this.carId).subscribe(
      (response: Car) =>
        this.car = response,
      error =>
        console.error('Error getting car details', error)
    )
  }

  rentCar(): void {
    this.bookingService.createBooking(this.carId, this.userId, {
      startDate: Date.now().toString(),
      endDate: Date.now().toString(),
      timeStamp: Date.now().toString(),
      bookingStatus: BookingStatus.Pending,
      total: 50,
      car: this.car,
      user: this.user
    })
      .subscribe(
        response => {
          this.snackBar.open(`Successfully rented car for ${this.endDate - this.startDate} days`, 'Close', {
            duration: 1500,
          });
          this.router.navigate([RoutesPath.bookingsOverview]);
        },
        error => {
          this.snackBar.open(`Error while renting car!`, 'Close', {
            duration: 1500,
          });
        }
      );
  }
}
