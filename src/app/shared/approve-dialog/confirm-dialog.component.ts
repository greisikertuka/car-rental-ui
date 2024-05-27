import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {AppColors} from "../colors";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../components/bookings-overview/bookings-overview.component";

@Component({
  selector: 'app-delete-user',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  title: String;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
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
