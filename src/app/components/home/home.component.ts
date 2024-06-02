import {Component, OnDestroy, OnInit} from '@angular/core';
import {Car} from "../../generated-code";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CarEndpointApi} from "../../api-client/endpoint/car-endpoint-api";
import {AppColors} from "../../shared/colors";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  cars?: Car[];

  constructor(private carEndpointApi: CarEndpointApi, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.carEndpointApi.getAllCars().subscribe(
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

  protected readonly AppColors = AppColors;
}
