import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../bookings-overview.component";
import {Booking, Rating} from "../../../generated-code";
import {AppColors} from "../../../shared/colors";

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './view-rating-dialog.component.html',
  styleUrls: ['./view-rating-dialog.component.scss']
})
export class ViewRatingDialogComponent {
  @Output() newItemEvent = new EventEmitter<string>();
  title: String;
  booking: Booking;
  rating: Rating;

  constructor(
    public dialogRef: MatDialogRef<ViewRatingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.title = data.title;
    this.booking = data.booking;
    this.rating = this.booking!.rating!;
  }

  close(): void {
    this.dialogRef.close();
  }

  protected readonly AppColors = AppColors;
  protected readonly Date = Date;
}
