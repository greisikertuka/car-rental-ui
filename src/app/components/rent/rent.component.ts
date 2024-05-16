import {Component, OnInit} from '@angular/core';
import {BookingStatus, Car, User} from "../../generated-code";
import {ActivatedRoute, Router} from "@angular/router";
import {CarRentalApi} from "../../service/car-rental-api.service";
import {AuthService} from "../../authentication/auth.service";
import {BookingEndpoint} from "../../api-client/endpoint/rent/booking-endpoint.service";
import {RoutesPath} from "../../shared/routes";
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppColors} from "../../shared/colors";
import {formWidth} from "../../shared/helpers";

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss'],
})
export class RentComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carRentalApi: CarRentalApi,
    private authService: AuthService,
    private bookingService: BookingEndpoint,
    private snackBar: MatSnackBar) {
    this.rentForm = new FormGroup({
      dateRange: new FormGroup({
        start: new FormControl<Date | null>(null, Validators.required),
        end: new FormControl<Date | null>(null, Validators.required),
      }),
      name: new FormControl<String>('', Validators.required),
      lastName: new FormControl<String>('', Validators.required),
      email: new FormControl<String>('', [Validators.required, Validators.email]),
      phone: new FormControl<String>('', Validators.required),
    });
  }

  carId!: number;
  userId!: number;
  car!: Car;
  user!: User;
  rentForm: FormGroup;

  protected readonly AppColors = AppColors;
  protected readonly formWidth = formWidth;

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
        this.snackBar.open('Error while getting car!', 'Close', {
          duration: 1500,
          panelClass: ["error-snackbar"]
        })
    )
  }

  rentCar(): void {
    const formValue = this.rentForm.value['dateRange'];
    const daysDifference = Math.floor((formValue.end.getTime() - formValue.start.getTime()) / (1000 * 60 * 60 * 24));
    const total = this.car.price * daysDifference;
    this.bookingService.createBooking(this.carId, this.userId, {
      name: this.rentForm.value['name'],
      lastName: this.rentForm.value['lastName'],
      email: this.rentForm.value['email'],
      phone: this.rentForm.value['phone'],
      startDate: formValue.start.getTime().toString(),
      endDate: formValue.end.getTime().toString(),
      timeStamp: Date.now().toString(),
      bookingStatus: BookingStatus.Pending,
      total: total,
      car: this.car,
      user: this.user
    })
      .subscribe(
        () => {
          this.snackBar.open(`Successfully rented car for ${daysDifference} days!`, 'Close', {
            duration: 1500,
            panelClass: ["success-snackbar"]
          });
          this.router.navigate([RoutesPath.bookingsOverview]);
        },
        () => {
          this.snackBar.open(`Error while renting car!`, 'Close', {
            duration: 1500,
            panelClass: ["error-snackbar"]
          });
        }
      );
  }

}
