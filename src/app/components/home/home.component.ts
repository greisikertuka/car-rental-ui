import {Component, OnDestroy, OnInit} from '@angular/core';
import {Car} from "../../generated-code";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CarEndpointApi} from "../../api-client/endpoint/car-endpoint-api";
import {AppColors} from "../../shared/colors";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {CarCardComponent} from "./car-card/car-card.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CarCardComponent
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  fetchedCars?: Car[];
  cars?: Car[];
  searchQuery: string = '';

  submitSearch(): void {
    if (this.searchQuery.length > 0) {
      this.carEndpointApi.searchCars(this.searchQuery).subscribe(
        (response: Car[]) => this.cars = response,
        () => this.snackBar.open('Error while searching cars!', 'Close', {
          duration: 1500,
          panelClass: ["error-snackbar"]
        })
      );
    } else {
      this.ngOnInit();
    }
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
          panelClass: ["error-snackbar"]
        })
    )
  }

  ngOnDestroy(): void {
  }

  protected readonly AppColors = AppColors;
}
