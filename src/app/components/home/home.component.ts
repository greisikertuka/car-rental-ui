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
  fetchedCars?: Car[];
  cars?: Car[];
  searchQuery: string = '';

  submitSearch(): void {
    this.cars = this.fetchedCars?.filter((car) => car.brand.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) || car.model.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.cars = this.fetchedCars;
  }

  constructor(private carEndpointApi: CarEndpointApi, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.carEndpointApi.getAllCars().subscribe(
      (response: Car[]) => {
        this.fetchedCars = response;
        this.cars = this.fetchedCars;
      },

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
