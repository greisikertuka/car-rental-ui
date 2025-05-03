import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {Brand, Car, Color, FuelType, Insurance, Mileage, Transmission,} from "../../../generated-code";
import {DialogData} from "../../bookings-overview/bookings-overview.component";
import {AppColors} from "../../../shared/colors";
import {getEnumArray} from "../../../shared/helpers";

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule
  ],
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {
  title: String;
  addCarForm: FormGroup;
  brands = getEnumArray(Brand);
  colors = getEnumArray(Color);
  fuelTypes = getEnumArray(FuelType)
  transmissionTypes = getEnumArray(Transmission)

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

  ngOnInit(): void {
  }

  //todo - fix
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
        reviewsCount: 0,
        mileage: Mileage._0,
        insurance: Insurance.Atlantik,
        minimumDays: 1,
        maximumDays: 5,
        babySeats: 2,
        createdAt: new Date().toString(),
        luggage: 2,
        options: undefined,
        imageUrl: undefined,
        imagePublicId: undefined,
        businessId: 17,
        carLocations: undefined,
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
