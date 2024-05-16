import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Car} from "../../generated-code";
import {CarRentalApi} from "../../service/car-rental-api.service";
import {RoutesPath} from "../../shared/routes";
import {AppColors} from "../../shared/colors";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  carId!: number;
  car!: Car;

  constructor(private route: ActivatedRoute, private carRentalApi: CarRentalApi, private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.carId = +params['carId'];
    });
    this.carRentalApi.carEndpointService.carsGetIdGet(this.carId).subscribe(
      (response: Car) =>
        this.car = response,
      error =>
        console.error('Error getting car details', error)
    )
  }

  goToRentPage() {
    const queryParams: Params = this.car.id ? {carId: this.car.id?.toString()} : {};
    this.router.navigate([RoutesPath.rent], {queryParams: queryParams});
  }

  protected readonly AppColors = AppColors;
}
