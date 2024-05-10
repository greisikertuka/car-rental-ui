import {Component, Input} from '@angular/core';
import {Booking} from "../../generated-code";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
  @Input() booking!: Booking;
  @Input() index!: number;
}
