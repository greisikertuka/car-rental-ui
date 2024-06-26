import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {
  Brand,
  BrandDisplayNames,
  Car,
  Color,
  ColorDisplayNames,
  FuelType,
  FuelTypeDisplayNames,
  Role,
  Transmission,
  TransmissionDisplayNames,
  User
} from "../../generated-code";
import {RoutesPath} from "../../shared/routes";
import {AppColors} from "../../shared/colors";
import {CarEndpointApi} from "../../api-client/endpoint/car-endpoint-api";
import {MatSnackBar} from "@angular/material/snack-bar";
import {convertToCamelCase, getEnumArray} from "../../shared/helpers";
import {AuthService} from "../../authentication/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileEndpointApi} from "../../api-client/endpoint/file-endpoint-api";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  user!: User;
  carId!: number;
  car!: Car;
  editMode: boolean = false;
  carEditForm!: FormGroup;
  brands = getEnumArray(Brand, BrandDisplayNames);
  colors = getEnumArray(Color, ColorDisplayNames);
  fuelTypes = getEnumArray(FuelType, FuelTypeDisplayNames);
  transmissionTypes = getEnumArray(Transmission, TransmissionDisplayNames);
  thumbnaimForm!: FormGroup;
  selectedFile: File | null = null;
  thumbnailSrc: string | undefined;

  constructor(private route: ActivatedRoute,
              private carEndpointApi: CarEndpointApi,
              private snackBar: MatSnackBar,
              private router: Router,
              private authService: AuthService,
              private fb: FormBuilder,
              private fileEndpointApi: FileEndpointApi) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.carId = +params['carId'];
    });
    this.authService.user$.subscribe(
      user => this.user = user!,
      () => this.snackBar.open('There was an error when getting the user!', 'Close', {
        duration: 1500,
        panelClass: ["error-snackbar"]
      })
    );
    this.carEndpointApi.getCarById(this.carId).subscribe(
      (response: Car) =>
        this.car = response,
      () =>
        this.snackBar.open('Could not get car details!', 'Close', {
          duration: 1500,
          panelClass: ["error-snackbar"]
        })
    );
    this.fileEndpointApi.getCarPicture(this.carId).subscribe(blob => {
      const reader = new FileReader();
      reader.onload = () => {
        this.thumbnailSrc = reader.result as string;
      };
      reader.readAsDataURL(blob);
    });
    this.carEditForm = this.fb.group({
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
    this.thumbnaimForm = this.fb.group({
      file: [null, Validators.required]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.thumbnaimForm.patchValue({
        file: file
      });
      this.thumbnaimForm.get('file')?.updateValueAndValidity();
    }
  }

  saveCarPicture(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      formData.append('fileName', this.selectedFile.name);

      this.fileEndpointApi.uploadCarPicture(this.car.id!, formData).subscribe(
        response => {
          this.snackBar.open(response['message'], 'Close', {
            duration: 1500,
            panelClass: ['success-snackbar']
          });
          this.thumbnaimForm.reset();
        },
        () => {
          this.snackBar.open('Error when uploading car picture', 'Close', {
            duration: 1500,
            panelClass: ['error-snackbar']
          });
        }
      );
    }
  }

  goToRentPage() {
    const queryParams: Params = this.car.id ? {carId: this.car.id?.toString()} : {};
    this.router.navigate([RoutesPath.rent], {queryParams: queryParams});
  }

  saveCarChanges() {
    this.car = {
      id: this.car.id,
      model: this.carEditForm.value['model'],
      brand: this.carEditForm.value['brand'],
      engine: this.carEditForm.value['engine'],
      fuelType: this.carEditForm.value['fuelType'],
      doors: this.carEditForm.value['doors'],
      color: this.carEditForm.value['color'],
      transmission: this.carEditForm.value['transmission'],
      seats: this.carEditForm.value['seats'],
      year: this.carEditForm.value['year'],
      licencePlate: this.carEditForm.value['licencePlate'],
      price: this.carEditForm.value['price'],
      averageRating: this.car.averageRating,
      reviewsCount: this.car.reviewsCount,
    };
    this.carEndpointApi.updateCar(this.car).subscribe(
      () => this.snackBar.open('Successfully updated car!', 'Close', {
        duration: 1500,
        panelClass: ["success-snackbar"]
      }),
      () =>
        this.snackBar.open('Error when updating car', 'Close', {
          duration: 1500,
          panelClass: ["error-snackbar"]
        })
    )
    this.editMode = false;
  }

  protected readonly AppColors = AppColors;
  protected readonly convertToCamelCase = convertToCamelCase;
  protected readonly Role = Role;
}
