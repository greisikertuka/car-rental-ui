import {Component, OnInit, ViewChild} from '@angular/core';
import {AppColors} from "../../shared/colors";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Car} from "../../generated-code";
import {CarEndpointApi} from "../../api-client/endpoint/car-endpoint-api";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ConfirmDialogComponent} from "../../shared/approve-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {RoutesPath} from "../../shared/routes";
import {AddCarComponent} from "./add-car/add-car.component";

@Component({
  selector: 'app-admin-car-table',
  templateUrl: './admin-car-table.component.html',
  styleUrls: ['./admin-car-table.component.scss']
})
export class AdminCarTableComponent implements OnInit {
  cars: Car[] = [];
  displayedColumns: string[] = ['id', 'brand', 'fuelType', 'transmission', 'year', 'averageRating', 'price', 'actions'];
  dataSource: MatTableDataSource<Car> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private carEndpointApi: CarEndpointApi,
              private snackBar: MatSnackBar,
              private _liveAnnouncer: LiveAnnouncer,
              public dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.carEndpointApi.getAllCars().subscribe(cars => {
        this.cars = cars;
        this.dataSource = new MatTableDataSource<Car>(this.cars);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      () =>
        this.snackBar.open('Error while getting all cars!', 'Close', {
          duration: 1500,
          panelClass: ["error-snackbar"]
        }));
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openAddCarPopup() {
    const dialogRef = this.dialog.open(AddCarComponent, {
      width: '400px',
      height: '750px',
      data: {title: 'Add Car'}
    });

    dialogRef.afterClosed().subscribe(addedCar => {
      if (addedCar) {
        this.carEndpointApi.createCar(addedCar).subscribe(
          () => {
            this.snackBar.open('Car was added successfully!', 'Close', {
              duration: 1500,
              panelClass: ["success-snackbar"]
            });
            this.getCars();
          },
          () => this.snackBar.open('There was an error when adding the car!', 'Close', {
            duration: 1500,
            panelClass: ["error-snackbar"]
          })
        );
      }
    });
  }

  deleteCar(id: number): void {
    this.carEndpointApi.deleteCarById(id).subscribe(() => {
        this.snackBar.open('Successfully deleted car!', 'Close', {
          duration: 1500,
          panelClass: ["success-snackbar"]
        });
        this.getCars();
      },
      () =>
        this.snackBar.open('Error deleting car!', 'Close', {
          duration: 1500,
          panelClass: ["error-snackbar"]
        }));
  }

  navigateToCarDetails(carId: number) {
    this.router.navigate([RoutesPath.carDetails], {queryParams: {carId: carId}});
  }

  openDeleteCarDialog(car: Car): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      height: '200px',
      data: {title: 'Are you sure you want to delete this car?', car: car}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCar(car.id!);
      }
    });
  }

  protected readonly AppColors = AppColors;
}
