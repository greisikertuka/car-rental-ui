import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {
  Brand,
  BrandDisplayNames,
  Car,
  Color,
  ColorDisplayNames,
  FuelType,
  FuelTypeDisplayNames,
  Transmission,
  TransmissionDisplayNames
} from "../../../generated-code";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../bookings-overview/bookings-overview.component";
import {AppColors} from "../../../shared/colors";
import {getEnumArray} from "../../../shared/helpers";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent {
  title: String;
  addCarForm: FormGroup;
  brands = getEnumArray(Brand, BrandDisplayNames);
  colors = getEnumArray(Color, ColorDisplayNames);
  fuelTypes = getEnumArray(FuelType, FuelTypeDisplayNames)
  transmissionTypes = getEnumArray(Transmission, TransmissionDisplayNames)

  constructor(
    public dialogRef: MatDialogRef<AddCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {
    this.title = data.title;

    this.addCarForm = this.fb.group({
      model: ['', Validators.required],
      brand: ['', Validators.required],
      engine: ['', Validators.required],
      fuelType: ['', Validators.required],
      doors: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      color: ['', Validators.required],
      transmission: ['', Validators.required],
      seats: ['', [Validators.required, Validators.min(1), Validators.max(200)]],
      year: ['', [Validators.required, Validators.min(1950), Validators.max(2200)]],
      licencePlate: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  save(): void {
    if (this.addCarForm.valid) {
      let car: Car = {
        model: this.addCarForm.value['model'],
        brand: this.addCarForm.value['brand'],
        engine: this.addCarForm.value['engine'],
        fuelType: this.addCarForm.value['fuelType'],
        doors: this.addCarForm.value['doors'],
        color: this.addCarForm.value['color'],
        transmission: this.addCarForm.value['transmission'],
        seats: this.addCarForm.value['seats'],
        year: this.addCarForm.value['year'],
        licencePlate: this.addCarForm.value['licencePlate'],
        price: this.addCarForm.value['price'],
        averageRating: 0.0,
        reviewsCount: 0
      }
      this.dialogRef.close(car);
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  protected readonly Date = Date;

  protected readonly AppColors = AppColors;
}
