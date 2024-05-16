import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {Booking, Rating} from "../../../generated-code";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../bookings-overview.component";
import {AppColors} from "../../../shared/colors";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.scss']
})
export class AddRatingComponent {
  @Output() newItemEvent = new EventEmitter<string>();
  title: String;
  booking: Booking;
  ratingForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddRatingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {
    this.title = data.title;
    this.booking = data.booking;

    // Initialize the form
    this.ratingForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.maxLength(100)]
    });
  }

  save(): void {
    if (this.ratingForm.valid) {
      let rating: Rating = {
        rating: this.ratingForm.value['rating'],
        comment: this.ratingForm.value['comment'],
        timeStamp: Date.now().toString(),
        car: this.booking.car,
        user: this.booking.user
      }
      this.dialogRef.close(rating);
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  protected readonly Date = Date;
  protected readonly AppColors = AppColors;
}
