import {Component, OnDestroy, OnInit} from '@angular/core';
import {Car, CarEndpointService} from "../../generated-code";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  cars?: Car[];

  constructor(private carEndpointService: CarEndpointService) {
  }

  ngOnInit(): void {
    this.getCars()
  }

  ngOnDestroy(): void {
  }

  getCars() {
    this.carEndpointService.carsAllGet().subscribe(
      (response: Car[]) =>
        this.cars = response,
      error =>
        console.error('Error getting cars', error)
    )
  }


}
