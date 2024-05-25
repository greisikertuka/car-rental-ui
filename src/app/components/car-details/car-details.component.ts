import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Car} from "../../generated-code";
import {RoutesPath} from "../../shared/routes";
import {AppColors} from "../../shared/colors";
import {CarEndpointApi} from "../../api-client/endpoint/car-endpoint-api";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  carId!: number;
  car!: Car;

  constructor(private route: ActivatedRoute, private carEndpointApi: CarEndpointApi, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.carId = +params['carId'];
    });
    this.carEndpointApi.getCarById(this.carId).subscribe(
      (response: Car) =>
        this.car = response,
      () =>
        this.snackBar.open('Could not get car details!', 'Close', {
          duration: 1500,
          panelClass: ["error-snackbar"]
        })
    )
  }

  goToRentPage() {
    const queryParams: Params = this.car.id ? {carId: this.car.id?.toString()} : {};
    this.router.navigate([RoutesPath.rent], {queryParams: queryParams});
  }

  protected readonly AppColors = AppColors;
}
