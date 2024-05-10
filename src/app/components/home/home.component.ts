import {Component, OnDestroy, OnInit} from '@angular/core';
import {Car} from "../../generated-code";
import {CarRentalApi} from "../../service/car-rental-api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  cars?: Car[];

  constructor(private carRentalApi: CarRentalApi) {
  }

  ngOnInit(): void {
    this.carRentalApi.carEndpointService.carsAllGet().subscribe(
      (response: Car[]) =>
        this.cars = response,
      error =>
        console.error('Error getting cars', error)
    )
  }

  ngOnDestroy(): void {
  }


}
