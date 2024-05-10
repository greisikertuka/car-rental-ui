import {Component, Input} from '@angular/core';
import {Car} from "../../generated-code";
import {Params, Router} from '@angular/router';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent {
  @Input() car!: Car;

  constructor(private router: Router) {
  }

  goToCarDetails() {
    const queryParams: Params = this.car.id ? {carId: this.car.id?.toString()} : {};
    this.router.navigate(['/car-details'], {queryParams: queryParams});
  }
}
