import {Component, OnInit} from '@angular/core';
import {BookingStatus, Car, User} from "../../generated-code";
import {ActivatedRoute} from "@angular/router";
import {CarRentalApi} from "../../service/car-rental-api.service";
import {AuthService} from "../../authentication/auth.service";
import {BookingService} from "./bookingservice";

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit {
  constructor(private route: ActivatedRoute, private carRentalApi: CarRentalApi, private authService: AuthService, private bookingService: BookingService) {
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
    console.log(this.user);
    console.log({
      startDate: this.startDate,
      endDate: this.endDate,
      timeStamp: Date.now().toString(),
      bookingStatus: BookingStatus.Pending,
      total: this.car.price * (this.endDate - this.startDate),
      car: this.car,
      user: this.user
    });
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
          // Handle successful response
          console.log('Booking created successfully:', response);
        },
        error => {
          // Handle error response
          console.error('Error creating booking:', error);
        }
      );
  }
}
