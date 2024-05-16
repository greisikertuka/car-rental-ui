import {Component, OnDestroy, OnInit} from '@angular/core';
import {Car} from "../../generated-code";
import {CarRentalApi} from "../../service/car-rental-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  cars?: Car[];

  constructor(private carRentalApi: CarRentalApi, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.carRentalApi.carEndpointService.carsAllGet().subscribe(
      (response: Car[]) =>
        this.cars = response,
      () =>
        this.snackBar.open(`Error while loading cars!`, 'Close', {
          duration: 1500,
        })
    )
  }

  ngOnDestroy(): void {
  }

}
