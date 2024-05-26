import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {AppColors} from "../../../shared/colors";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../bookings-overview/bookings-overview.component";

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-car.component.html',
  styleUrls: ['./delete-car.component.scss']
})
export class DeleteCarComponent {
  title: String;

  constructor(
    public dialogRef: MatDialogRef<DeleteCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.title = data.title;
  }

  save(): void {
    this.dialogRef.close(true);
  }

  close(): void {
    this.dialogRef.close(false);
  }

  protected readonly AppColors = AppColors;
}
